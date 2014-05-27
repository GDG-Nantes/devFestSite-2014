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
        root:'./',
        dir: 'partials',
        index: 'index.html',
        all : '**/*.html'
      },
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
      assets:{
        dir:            'assets',
        manifest:   'devfest_appcache.manifest',
        sitemap:        'sitemap.xml',
        robots:         'robots.txt',
        yaml:           'app.yaml'
      }

    },
    
    /*
    * TARGET
    **/
    dest: {
      // Distant parameters
      root: 'dist',
      html: {
            all:      'dist/partials',
            index:    'dist/index.html' 
        },
        comp: {
            components: 'dist/components',
            bower:      'dist/bower_components',
            fonts :     'dist/fonts'
        },     
        css:        'dist/css',
        js:         'dist/javascript',
        assets:{
          dir:            'dist/assets',
          manifest:   'dist/devfest_appcache.manifest',
          sitemap:        'dist/sitemap.xml',
          robots:         'dist/robots.txt',
          yaml:           'dist/app.yaml'
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
      all:      ['<%= dest.root %> ']      
    },

    /*
    * COPY FILES
    **/
    copy: {
      // Standard Web Copies
      site:{        
        files: [
          { expand: true, cwd: '<%= src.html.dir %>', src: ['**'], dest: '<%= dest.html.all %>' },
          { expand: true, cwd: '<%= src.assets.dir %>', src: ['**'], dest: '<%= dest.assets.dir %>' },
          { expand: true, cwd: '<%= src.comp.fonts %>', src: ['**'], dest: '<%= dest.comp.fonts %>' },
          { src: '<%= src.html.index %>', dest: '<%= dest.html.index %>' },
          { src: '<%= src.assets.manifest %>', dest: '<%= dest.assets.manifest %>' },
          { src: '<%= src.assets.sitemap %>', dest: '<%= dest.assets.sitemap %>' },
          { src: '<%= src.assets.robots %>', dest: '<%= dest.assets.robots %>' },
          { src: '<%= src.assets.yaml %>', dest: '<%= dest.assets.yaml %>' }
        ]     
      }
    },

    /* Config auto des taches concat, uglify et cssmin */
    useminPrepare: {
      web: {
        src: ['<%= dest.html.index %>'],
        options: {
          dest : '<%= dest.root %>',
          root : '<%= src.html.root %>'
        }
        
      }
    },

    /* Usemin task */
    usemin: {
      html:['<%= dest.html.index %>']
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
        files: {
          app: ['<%= src.js.all %>']
        }
      },
      ic: {
        options: {
          reporter: 'checkstyle',
          reporterOutput: 'checkstyle/jshint_checkstyle.xml'
        },
        files: {
          app: ['<%= src.js.all %>']
        }
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
            { id: 'checkstyle-xml', dest: 'checkstyle/csslint_checkstyle.xml' }
          ]
        },
        src: '<%= src.css.all %>'
      }
    },

    browser_sync:{
      files: [
        '<%= src.css.all %>',
        '*.html',
        'partials/*.html',
        'javascript/*.js'
      ],
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
        files: [
          '*.html',
          'partials/*.html'
        ]
      },
      js: {
        files: [
          'javascript/*.js'
        ]
      }
    },

  });

  // Chargement des plugins
  require('load-grunt-tasks')(grunt);

  // Déclaration des taches
  grunt.registerTask('lint',        ['jshint:dev', 'compass', 'csslint:dev']);
  grunt.registerTask('test',        ['lint', 'karma:unit', 'karma:e2e']);
  grunt.registerTask('ic',          ['jshint:ic', 'compass', 'csslint:ic', 'karma:ic_unit', 'karma:ic_e2e']);
  grunt.registerTask('release',     [/*'ic', */'compass', 'clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'clean:tmp']);
  grunt.registerTask('default',     ['test', 'release']);

};