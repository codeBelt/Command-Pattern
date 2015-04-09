module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        /**
         * This will load in our package.json file so we can have access
         * to the project name and version number.
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Constants for the Gruntfile so we can easily change the path for our environments.
         */
        BASE_PATH: '',
        DEVELOPMENT_PATH: 'src/',
        PRODUCTION_PATH: 'web/',

        /**
         * Cleans or deletes our production folder before we create a new production build.
         */
        clean: {
            web: ['<%= PRODUCTION_PATH %>'],
            temp: ['.tmp']
        },

        /**
         * Copies certain files over from the development folder to the production folder so we don't have to do it manually.
         */
        copy: {
            web:  {
                files: [
                    // Copy the media folder from development to production
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['assets/media/**'], dest: '<%= PRODUCTION_PATH %>' },
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['assets/styles/**'], dest: '<%= PRODUCTION_PATH %>' },
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['assets/vendor/**/*.js'], dest: '<%= PRODUCTION_PATH %>' },
                    // Copy the index.html file from development to production
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', dest: '<%= PRODUCTION_PATH %>', src: ['index.html'], filter: 'isFile', dot: true }
                ]
            }
        },

        /**
         * Compiles the TypeScript files into one JavaScript file.
         */
        typescript: {
            base: {
                src: ['<%= DEVELOPMENT_PATH %>' + 'assets/scripts/TestApp.ts'],
                dest: '<%= PRODUCTION_PATH %>' + 'assets/scripts/app.js',
                options: {
                    target: 'es5', //or es3
                    basePath: '',
                    sourceMap: false,
                    declaration: false,
                    nolib: false,
                    comments: true
                }
            }
        },

        /**
         * Creates a node.js Server to test our code in a server like environment.
         * Note: We are using the watch task to keep the server running.
         */
        connect: {
            options: {
                port: 8888,
                protocol: 'http',
                base: '<%= PRODUCTION_PATH %>',
                livereload: true
            },
            server: {

            }
        },

        /**
         * Opens the index.html file in the default browser after the node.js Express Server is running.
         */
        open: {
            web: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= connect.options.port%>'
            }
        },

        /**
         * Watches files and will run task(s) when files are changed. It will also reload/refresh the browser.
         */
        watch: {
            src: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/**/*.ts'
                ],
                tasks: ['src']
            }
        }

    });

    /**
     * Grunt tasks:
     *
     * grunt        (Will build and run your development code/server)
     */
    grunt.registerTask('default', [
        'clean',
        'typescript',
        'copy'
    ]);

    grunt.registerTask('launch', [
        'default',
        'connect',
        'open',
        'watch'
    ]);

};