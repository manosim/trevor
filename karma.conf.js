// Karma configuration
// Generated on Thu Oct 09 2014 15:56:44 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

            // Ionic Files
            'www/lib/ionic/js/ionic.bundle.js',

            // Angular Mocks
            'node_modules/angular-mocks/angular-mocks.js',

            // App
            'www/js/app.js',

            // Controllers
            'www/js/controllers.js',
            'www/js/controllers/*.js',

            // Services
            'www/js/services.js',
            'www/js/services/*.js',

            // Filters
            'www/js/filters.js',
            'www/js/filters/*.js',

            // Tests
            'tests/controllers/*.js',
            // 'tests/services/*.js',
            // 'tests/filters/*.js',

            // Templates
            'www/templates/**/*.html',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'www/js/**/*.js': 'coverage',
        'www/templates/**/*.html': 'ng-html2js',
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
        stripPrefix: 'www/',
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