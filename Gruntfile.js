module.exports = function(grunt){

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      html: {
          files: ['app/index.html'],
          //tasks: ['htmlhint']
      },
      js: {
        files: ['app/src/js/app.js'],
        //tasks: ['uglify']
      },
      css: {
        files: ['app/src/styles/**/*.scss'],
        //tasks: ['buildcss']
      }
    },

    //JS

    uglify: {
      build: {
        files: {
          'app/build/js/app.min.js': ['app/src/js/app.js']
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
          bases: ['app'], // Replace with the directory you want the files served from
                             // Make sure you don't use `.` or `..` in the path as Express
                             // is likely to return 403 Forbidden responses if you do
                             // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }

  });

  grunt.registerTask('default', []);
  grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
  grunt.registerTask('buildjs',   ['uglify']);
  grunt.registerTask('buildall',  ['sass', 'cssc', 'cssmin', 'uglify']);


  // Creates the `server` task
  grunt.registerTask('serve', [
    'express',
    'open',
    'watch'
  ]);
};