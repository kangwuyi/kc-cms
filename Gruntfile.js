module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
        tasks: ['sass:dist']
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/styles.css': 'public/sass/styles.scss'
        }
      }
    }
  });
  grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
        tasks: ['compass:dist']
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/styles.css': 'public/sass/styles.scss'
        }
      }
    },
    compass: {
       dist: {
        options: {
        config: 'config.rb'
      }
    }
  }
  
});
  grunt.registerTask('default', ['compass:dist', 'watch']);
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect:{
      //这里为插件子刷新方式
      options: {
        port: 9900,
        hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
        livereload: 35729  //声明给 watch 监听的端口
      },
      server: {
        options: {
          open: true, //自动打开网页 http://
          base: [
            '.'  //主目录
            ]
          }
        }
      
    },
    watch: {
      sass: {
        files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
        tasks: ['compass:dist']
      },
      livereload: {
        options: {
                  livereload:'<%=connect.options.livereload%>'  //监听前面声明的端口  35729
                },
                files:[  //下面文件的改变就会实时刷新网页
                'app/*.html',
              'public/css/{,*/}*.css',
            'public/js/{,*/}*.js',
          'public/img/{,*/}*.{png,jpg}'

          ]
        }
      },

      compass: {
       dist: {
        options: {
          config: 'config.rb'
        }
      }
    }


  });


grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.registerTask('default', ['compass:dist','connect:server', 'watch']);
};