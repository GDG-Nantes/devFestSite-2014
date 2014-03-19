/**
* Created with devFestSite-2014.
* User: jefBinomed
* Date: 2014-03-19
* Time: 08:52 PM
* To change this template use Tools | Templates.
*/
module.exports = function (grunt) {

  // Configuration du build
  grunt.initConfig({

    package: grunt.file.readJSON('package.json'),

    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    //// PARAMETERS FOR TASK
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    /*
    * SOURCE
    **/
    src: {
      html: {
        dir: 'src/main/html',
        index: 'src/main/html/index.html',
        all : 'src/main/html/**/*.html'
      },
      res:  'src/main/assets',
      comp: {
        components: 'src/main/components',
        bower :     'src/main/bower_components',
        fonts :     'src/main/bower_components/font-awesome/fonts'
      },
      js:   {
        all: 'src/main/javascript/**/*.js',
        dir: 'src/main/javascript'
      }, 
      scss: {
        all: 'src/main/scss/**/*.scss',
        dir: 'src/main/scss/'
      },
      css: {
        all: 'src/main/css/**/*.css',
        dir: 'src/main/css/'
      },
      manifest_web: 'src/main/cst_appcache.manifest',
      manifest_firefox: 'src/main/manifest.webapp',
      test: ['src/test/javascript/**/*.js']

    },
    
    /*
    * TARGET
    **/
    dest: {
      // Distant parameters
      root: 'dist',
      // Firefox Build
      firefox: {
        root:       'dist/firefox',
        html: {
          all:      'dist/firefox/html',
          index:    'dist/firefox/html/index.html' 
        },      
        comp: {
          components: 'dist/firefox/components',
          bower:      'dist/firefox/bower_components',
          fonts :     'dist/firefox/fonts'
        },     
        res:        'dist/firefox/assets',
        css:        'dist/firefox/css',
        js:         'dist/firefox/javascript',
        manifest:  'dist/firefox/manifest.webapp'
      },
      // Chrome Build
      chrome: {
        root:       'dist/chrome',
        html: {
          all:      'dist/chrome/html',
          index:    'dist/chrome/html/index.html' 
        },
        res:        'dist/chrome/assets',
        comp: {
          components: 'dist/chrome/components',
          bower:      'dist/chrome/bower_components',
          fonts :     'dist/chrome/fonts'
        },     
        css:        'dist/chrome/css',
        js:         'dist/chrome/javascript'
      },
      // Standard Web Build
      web: {
        root:       'dist/web',
        html: {
          all:      'dist/web/html',
          index:    'dist/web/html/index.html' 
        },
        res:        'dist/web/assets',
        comp: {
          components: 'dist/web/components',
          bower:      'dist/web/bower_components',
          fonts :     'dist/web/fonts'
        },     
        css:        'dist/web/css',
        js:         'dist/web/javascript',
        manifest:   'dist/web/cst_appcache.manifest'
      }      
    },


    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    //// BUILD TASKS
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    /*
    * CLEAN DIRECTORIES
    **/
    clean: {
      tmp:      ['.tmp'],
      all:      ['<%= dest.root %> '],
      firefox:  ['<%= dest.firefox.root %>'],
      chrome:   ['<%= dest.chrome.root %>'],
      web:      ['<%= dest.web.root %>']      
    },

    /*
    * COPY FILES
    **/
    copy: {
      // Firefox Copies
      firefox: {
        files: [
          { expand: true, cwd: '<%= src.html.dir %>', src: ['**'], dest: '<%= dest.firefox.html.all %>' },
          { expand: true, cwd: '<%= src.res %>', src: ['**'], dest: '<%= dest.firefox.res %>' },
          { expand: true, cwd: '<%= src.comp.components %>', src: ['**'], dest: '<%= dest.firefox.comp.components %>' },
          { expand: true, cwd: '<%= src.comp.bower %>', src: ['**'], dest: '<%= dest.firefox.comp.bower %>' },
          { expand: true, cwd: '<%= src.comp.fonts %>', src: ['**'], dest: '<%= dest.firefox.comp.fonts %>' },
          { src: '<%= src.manifest_firefox %>', dest: '<%= dest.firefox.manifest %>' }
        ]
      },// Chrome Copies
      chrome: {
        files: [
          { expand: true, cwd: '<%= src.html.dir %>', src: ['**'], dest: '<%= dest.chrome.html.all %>' },
          { expand: true, cwd: '<%= src.res %>', src: ['**'], dest: '<%= dest.chrome.res %>' },
          { expand: true, cwd: '<%= src.comp.components %>', src: ['**'], dest: '<%= dest.chrome.comp.components %>' },
          { expand: true, cwd: '<%= src.comp.bower %>', src: ['**'], dest: '<%= dest.chrome.comp.bower %>' },
          { expand: true, cwd: '<%= src.comp.fonts %>', src: ['**'], dest: '<%= dest.chrome.comp.fonts %>' }
        ]
      },
      // Standard Web Copies
      web: {
        files: [
          { expand: true, cwd: '<%= src.html.dir %>', src: ['**'], dest: '<%= dest.web.html.all %>' },
          { expand: true, cwd: '<%= src.res %>', src: ['**'], dest: '<%= dest.web.res %>' },
          { expand: true, cwd: '<%= src.comp.components %>', src: ['**'], dest: '<%= dest.web.comp.components %>' },
          { expand: true, cwd: '<%= src.comp.bower %>', src: ['**'], dest: '<%= dest.web.comp.bower %>' },
          { expand: true, cwd: '<%= src.comp.fonts %>', src: ['**'], dest: '<%= dest.web.comp.fonts %>' },
          { src: '<%= src.manifest_web %>', dest: '<%= dest.web.manifest %>' }
        ]     
      }
    },

    /* Config auto des taches concat, uglify et cssmin */
    useminPrepare: {
      firefox: {
        src: ['<%= dest.firefox.html.index %>'],
        options: {
          dest : '<%= dest.firefox.html.all %>',
          root : '<%= src.html.dir %>'
        }
        
      },
      chrome: {
        src: ['<%= dest.chrome.html.index %>'],
        options: {
          dest : '<%= dest.chrome.html.all %>',
          root : '<%= src.html.dir %>'
        }
        
      },
      web: {
        src: ['<%= dest.web.html.index %>'],
        options: {
          dest : '<%= dest.web.html.all %>',
          root : '<%= src.html.dir %>'
        }
        
      }
    },

    /* Usemin task */
    usemin: {
      html:['<%= dest.firefox.html.index %>',
          '<%= dest.chrome.html.index %>',
          '<%= dest.web.html.index %>']
    },


    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    //// DEVELOPMENT TASKS
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    /*
    * Compass Task
    */
    compass: {
      app: {
        options: {
          sassDir: '<%= src.scss.dir %>',
          cssDir: '<%= src.css.dir %>'
          //,environment: 'production'
        }
      }
    },

    /*
    * JShint check
    **/
    jshint: { 
      options: {
        jshintrc: '.jshintrc'
      },
      dev: {
        files: ['<%= src.js.all %>', '<%= src.test %>']
      },
      ic: {
        options: {
          reporter: 'checkstyle',
          reporterOutput: 'target/jshint_checkstyle.xml'
        },
        files: ['<%= src.js.all %>', '<%= src.test %>']
      }
    },


    /*
    * CSSLint check
    **/
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      dev: {
        src: '<%= src.css.all %>'
      },
      ic: {
        options: {
          formatters: [
            { id: 'checkstyle-xml', dest: 'target/csslint_checkstyle.xml' }
          ]
        },
        src: '<%= src.css.all %>'
      }
    },

    /*
    * Tests
    **/
    karma: {
      unit: {
        configFile : 'src/test/config/karma-unit.conf.js',
        reporters: ['progress', 'coverage'],
        browsers: ['Chrome']
      },     
      e2e: {
        configFile : 'src/test/config/karma-e2e.conf.js',
        reporters: ['progress'],
        browsers: ['Chrome']/*,
        singleRun: false*/
      },
      dev_unit: {
        configFile : 'src/test/config/karma-unit.conf.js',
        reporters: ['progress', 'coverage'],
        browsers: ['Chrome'], 
        singleRun: false
      },
      dev_e2e: {
        configFile : 'src/test/config/karma-e2e.conf.js',
        reporters: ['progress'],
        browsers: ['Chrome'] ,
        singleRun: false
      },
      ic_unit: {
        configFile: 'src/test/config/karma-unit.conf.js'
      },
      ic_e2e: {
        configFile: 'src/test/config/karma-e2e.conf.js'
      }
    },


    browser_sync:{
      files: ['<%= src.css.all %>','<%= src.html.all %>','<%= src.js.all %>'],
      options:{
        server: {
          baseDir: "./"
        },
        watchTask:true,
        host:'127.0.0.1',
        port:8080
      }
    },    
   
    // Watch Configuration : compilation sass/compass + livereload 

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['<%= src.scss.all %>'],
        tasks: ['compass']
      },
      html: {
        files: ['src/main/html/**/*.html']
      },
      js: {
        files: ['src/main/javascript/**/*.js']
      }
    },

  });

  // Chargement des plugins
  require('load-grunt-tasks')(grunt);

  // Déclaration des taches
  grunt.registerTask('lint',        ['jshint:dev', 'compass', 'csslint:dev']);
  grunt.registerTask('test',        ['lint', 'karma:unit', 'karma:e2e']);
  grunt.registerTask('ic',          ['jshint:ic', 'compass', 'csslint:ic', 'karma:ic_unit', 'karma:ic_e2e']);
  grunt.registerTask('dist_firefox',['compass', 'clean', 'copy:firefox', 'useminPrepare:firefox', 'concat', 'uglify', 'cssmin', 'usemin', 'clean:tmp']);
  grunt.registerTask('dist_chrome', ['compass', 'clean', 'copy:chrome', 'useminPrepare:chrome', 'concat', 'uglify', 'cssmin', 'usemin', 'clean:tmp']);
  grunt.registerTask('dist_web',    ['compass', 'clean', 'copy:web', 'useminPrepare:web', 'concat', 'uglify', 'cssmin', 'usemin', 'clean:tmp']);
  grunt.registerTask('release',     [/*'ic', */'compass', 'clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'clean:tmp']);
  grunt.registerTask('default',     ['test', 'release']);

};