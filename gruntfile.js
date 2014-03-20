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
        dir: 'html',
        index: 'index.html',
        all : 'html/**/*.html'
      },
      res:  'assets',
      comp: {
        components: 'components',
        bower :     'bower_components',
        fonts :     'bower_components/font-awesome/fonts'
      },
      js:   {
        all: 'javascript/**/*.js',
        dir: 'javascript'
      }, 
      scss: {
        all: 'scss/**/*.scss',
        dir: 'scss/'
      },
      css: {
        all: 'css/**/*.css',
        dir: 'css/'
      },
      manifest_web: 'devfest_appcache.manifest'

    },
    
    /*
    * TARGET
    **/
    dest: {
      // Distant parameters
      root: 'dist',
      html: {
            all:      'dist/html',
            index:    'dist/index.html' 
        },
        res:        'dist/assets',
        comp: {
            components: 'dist/components',
            bower:      'dist/bower_components',
            fonts :     'dist/fonts'
        },     
        css:        'dist/css',
        js:         'dist/javascript',
        manifest:   'dist/devfest_appcache.manifest'
            
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
      all:      ['<%= dest.root %> ']      
    },

    /*
    * COPY FILES
    **/
    copy: {
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