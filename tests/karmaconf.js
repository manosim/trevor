// Karma configuration
// Generated on Thu Oct 09 2014 15:56:44 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

            // Ionic Files
            'app/www/lib/ionic/js/ionic.bundle.js',

            // Angular Mocks
            'tests/lib/angular-mocks.js',

            // App
            'app/www/js/app.js',

            // Controllers
            'app/www/js/controllers.js',
            'app/www/js/controllers/*.js',
            'app/www/js/controllers/**/*.js',

            // Services
            'app/www/js/services.js',
            'app/www/js/services/*.js',

            // Directives
            'app/www/js/directives.js',
            'app/www/js/directives/*.js',

            // Filters
            'app/www/js/filters.js',
            'app/www/js/filters/*.js',

            // Tests
            'tests/controllers/*.js',
            'tests/controllers/**/*.js',
            'tests/services/*.js',
            'tests/directives/*.js',
            'tests/filters/*.js',

            // Mocks
            'tests/mocks/*.js',

            // Templates
            'app/www/templates/**/*.html',
    ],


    // list of files to exclude
    exclude: [
        'tests/Gruntfile.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
            'app/www/js/**/*.js': 'coverage',
            'app/www/templates/**/*.html': 'ng-html2js',
    },


    coverageReporter: {
      type : 'text',
      dir : 'coverage/',
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // CommonJS
    require : true,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    ngHtml2JsPreprocessor: {
        // strip this from the file path
        stripPrefix: 'app/www/',
        moduleName: 'templates'
    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};