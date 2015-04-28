/*
 * grunt-marking-merge
 * https://github.com/stuarqi/grunt-marking-merge
 *
 * Copyright (c) 2015 zhangsq
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    escape = require('escape-regexp');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('marking_merge', 'Grunt task to merge files by marking', function() {
      var options = this.options({
          startSymbol : '/*<',
          endSymbol : '>*/',
          banner : '',
          footer : ''
      });
      options.startSymbol = escape(options.startSymbol);
      options.endSymbol = escape(options.endSymbol);
      this.files.forEach(function (fileObj) {
          var src = fileObj.src.filter(function (src) {
              if (!grunt.file.exists(src)) {
                  grunt.log.warn('Source file "' + src + '" not found.');
                  return false;
              }
              return true;
          }).map(function (src) {
              return [src, grunt.file.read(src)];
          }).forEach(function (src) {
              var regAll = new RegExp(options.startSymbol + '(.*)' + options.endSymbol, 'g'),
                  reg = new RegExp(options.startSymbol + '(.*)' + options.endSymbol),
                  fileContent = src[1],
                  match = fileContent.match(regAll),
                  filePath = path.dirname(src[0]);
              if (match) {
                  match.map(function (marking) {
                      var m = marking.match(reg);
                      return [m[1], path.resolve(filePath, m[1].trim())];
                  }).filter(function (file) {
                      if (!grunt.file.exists(file[1])) {
                          grunt.log.warn('File "' + file[1] + '" not found.');
                          return false;
                      }
                      return true;
                  }).forEach(function (file) {
                      fileContent = fileContent.replace(
                          new RegExp(options.startSymbol + file[0] + options.endSymbol, 'g'),
                          grunt.file.read(file[1])
                      );
                  });
              }
              grunt.file.write(fileObj.dest, options.banner + fileContent + options.footer);
          });

      });
    // Merge task-specific and/or target-specific options with these defaults.
    /*var options = this.options({
      punctuation: '.',
      separator: ', '
    });*/

    /*this.files.forEach(function (f) {
        console.log(f);
    });*/

    /*// Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });*/
  });

};
