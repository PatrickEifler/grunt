var config = {
  app: 'app/src',
  dist: 'app/build'
};


module.exports = function(grunt){

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    //CONFIG
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('./.bowerrc'),

    //WATCH
    watch: {
      options: {
        livereload: true
      },
      html: {
          files: ['app/index.html'],
      },
      js: {
        files: ['app/src/js/app.js'],
      },
      css: {
        files: ['app/src/styles/**/*.scss'],
      }
    },

    //JS

    //CONCAT LIB

    bower_concat: {
      all: {
        dest: 'app/src/js/lib.js'
      }
    },

    //MINIFY

    uglify: {
      build: {
        files: {
          'app/build/js/app.min.js': ['app/src/js/app.js']
        }
      },
      bower: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'app/build/js/lib.min.js': ['app/src/js/lib.js']
        }
      }
    },

    //HTML

     htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true
        },
        src: ['src/index.html']
      }
    },

    //CSS

    cssc: {
      build: {
        options: {
          consolidateViaDeclarations: true,
          consolidateViaSelectors:    true,
          consolidateMediaQueries:    true
        },
        files: {
          'app/build/css/master.css': 'app/build/css/master.css'
        }
      }
    },
    cssmin: {
      build: {
        src: 'app/build/css/master.css',
        dest: 'app/build/css/master.css'
      }
    },
    sass: {
      build: {
          files: {
            'app/build/css/master.css': 'app/src/styles/master.scss'
          }
      }
    },

    //LOGISTICS
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['app'],
          livereload: true
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },

    //SHELL
    shell: {
      bowerinstall: {
        command: function(libname){
          return 'bower install ' + libname + ' --save';
        }
      },
      bowerupdate: {
        command: function(libname){
          return 'bower update ' + libname;
        }
      }
    }

  });

  grunt.registerTask('default', []);

  //BUILD
  grunt.registerTask('buildcss',    ['sass', 'cssc', 'cssmin']);
  grunt.registerTask('buildjs',     ['uglify']);
  grunt.registerTask('buildall',    ['sass', 'cssc', 'cssmin', 'uglify', 'uglify:bower']);
  grunt.registerTask('buildbower',  ['bower_concat','uglify:bower']);

  //BOWER TASKS
  grunt.registerTask('bowerinstall', function(library) {
    grunt.task.run('shell:bowerinstall:' + library);
    grunt.task.run('buildbower');
  });
  grunt.registerTask('bowerupdate', function(library) {
    grunt.task.run('shell:bowerupdate:' + library);
    grunt.task.run('buildbower');
  });

  //SERVE (livereload enabled)
  grunt.registerTask('serve', [
    'express',
    'open',
    'watch'
  ]);
};