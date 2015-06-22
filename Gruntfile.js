module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            browserify: {
                files: './app/**/*.js',
                tasks: ['browserify'],
            },
            less: {
                files: './less/*.less',
                tasks: ['less:development']
            }
        },
        connect: {
            server: {
                options: {
                  hostname: 'localhost',
                  port: 3000,
                  base: './public'
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2
                },
                files: {
                    './public/stylesheets/style.css': './less/app.less'
                }
            }
        },
        browserify: {
            options: {
                transform: [require('grunt-react').browserify]
            },
            client: {
                src: ['./app/app.js'],
                dest: './public/javascripts/app.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');


    grunt.registerTask('default', ['browserify', 'less:development', 'connect', 'watch']);

};
