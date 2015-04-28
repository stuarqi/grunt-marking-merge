# grunt-marking-merge

> Grunt task to merge files by marking

## Getting Started
This plugin requires Grunt `^0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-marking-merge --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-marking-merge');
```

## The "marking_merge" task

### Overview
In your project's Gruntfile, add a section named `marking_merge` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  marking_merge: {
    default: {
      files : [
        {
          src : 'Namespace.js',  //The file containing marking string
          dest : 'merged.js'    //The path of the merged file
        }
      ]
    },
  },
});
```

### Options

#### options.startSymbol
Type: `String`
Default value: `/*<`

A string value that is used to mark marking start.

#### options.endSymbol
Type: `String`
Default value: `>*/`

A string value that is used to mark the marking end.

### Usage Examples

#### Default Options
In this example, The two files merged into a third file by marking.

```js
grunt.initConfig({
  marking_merge: {
    options: {},
    files: [{
      src : 'Namespace.js',
      dest : 'build/Namespace.js'
    }]
  }
});
```

The Namespace.js code:
 
```js
var Namespace = (function (Namespace) {
  // The marking of need to merge
  /*< Size.js >*/
    
  /*< Pixel.js >*/
  
  Namespace.Size = Size;
  Namespace.Pixel = Pixel;
})(Namespace || {});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  marking_merge: {
    options: {
      startSymbol: '/*--',
      punctuation: '--*/'
    },
    files: [{
      src : 'Namespace.js',
      dest : 'build/Namespace.js'
    }]
  },
});
```

```js
var Namespace = (function (Namespace) {
  // The marking of need to merge
  /*-- Size.js --*/
    
  /*--Pixel.js--*/
  
  Namespace.Size = Size;
  Namespace.Pixel = Pixel;
})(Namespace || {});
```
