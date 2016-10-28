module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            css: {
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'public/css/webapp-page.css'
                ],
                dest: 'public/css/concat.css'
            },
            js: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-animate/angular-animate.min.js',
                    'node_modules/angular-resource/angular-resource.min.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                    'node_modules/chart.js/dist/Chart.min.js',
                    'node_modules/angular-chart.js/dist/angular-chart.min.js',

                    'public/app/app.js',

                    'public/app/modules/menu/menuModule.js',
                    'public/app/modules/menu/menuController.js',

                    'public/app/modules/gitHubExplorer/gitHubExplorerModule.js',
                    'public/app/modules/gitHubExplorer/gitHubExplorerRoute.js',
                    'public/app/modules/gitHubExplorer/gitHubExplorerController.js',
                    'public/app/modules/gitHubExplorer/gitHubExplorerService.js',

                    'public/app/modules/about/aboutRoute.js',

                    'public/app/modules/history/historyModule.js',
                    'public/app/modules/history/historyRoute.js',
                    'public/app/modules/history/historyController.js',
                    'public/app/modules/history/historyService.js'
                ],
                dest: 'public/js/concat.js'
            }
        },
        watch: {
            assets: {
                expand: true,
                files: [
                    'public/css/webapp-page.css',
                    'public/app/**/*.js'
                ],
                tasks: ['concat']
            },
            livereload: {
                files : [
                    'public/*'
                ],
                options: {
                    livereload: 35729
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', ['concat']);
};