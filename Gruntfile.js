/*
 * grunt-marking-merge
 * https://github.com/stuarqi/grunt-marking-merge
 *
 * Copyright (c) 2015 zhangsq
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    marking_merge: {
      default : {
        files : [
          {
            template : 'test/src/template.js',
            files : {
              '/*--MSize--*/' : 'test/src/file1.js',
              '/*--MPixel--*/' : 'test/src/file2.js'
            },
            dest : 'test/result/Namespace.js'
          }
        ]
      },
      single : {
        template : 'test/src/template.js',
        files : {
          '/*--MSize--*/' : 'test/src/file1.js',
          '/*--MPixel--*/' : 'test/src/file2.js'
        },
        dest : 'test/result/Namespace.js'
      },
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!'
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  // runt.registerTask('test', ['clean', 'marking_merge', 'nodeunit']);
  grunt.registerTask('test', ['marking_merge:default']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
