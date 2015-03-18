module.exports = function(grunt){

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      html: {
          files: ['src/index.html'],
          tasks: ['htmlhint']
      },
      js: {
        files: ['src/js/app.js'],
        tasks: ['uglify']
      },
      css: {
        files: ['src/styles/**/*.scss'],
        tasks: ['buildcss']
      }
    },

    //JS

    uglify: {
      build: {
        files: {
          'build/js/app.min.js': ['src/js/app.js']
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
          'build/css/master.css': 'build/css/master.css'
        }
      }
    },
    cssmin: {
      build: {
        src: 'build/css/master.css',
        dest: 'build/css/master.css'
      }
    },
    sass: {
      build: {
          files: {
            'build/css/master.css': 'src/styles/master.scss'
          }
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
};