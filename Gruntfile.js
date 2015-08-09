module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 3000,
                    base: './public'
                }
            }
        },
        watch: {},
        webfont: {
            icons: {
                src: 'icons/*.svg',
                dest: 'public/fonts',
                destCss: 'less',
                options: {
                    hashes: false,
                    syntax: "bootstrap",
                    stylesheet: "less",
                    relativeFontPath: "/fonts",
                    htmlDemo: false,
                    templateOptions: {
                        baseClass: 'icon-'
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webfont');


    grunt.registerTask('default', ['connect', 'watch']);

};
