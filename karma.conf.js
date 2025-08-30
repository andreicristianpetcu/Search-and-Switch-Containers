module.exports = function (config) {
  config.set({
    files: ['test/test_initializer.js', 'background.js', 'test/**/*.spec.js'],
    browsers: ['FirefoxHeadless'],
    reporters: ['progress', 'coverage'],
    frameworks: ['jasmine', 'sinon', 'sinon-chrome', 'chai'],
    preprocessors: {
      'test/test_initializer.js': ['webpack'],
      'test/**/*.spec.js': ['webpack'],
    },
    babelPreprocessor: {
      options: {
        presets: ['env'],
        sourceMap: 'inline',
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      },
    },
    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },
    // Run tests once and exit (not continuous)
    singleRun: true,
    // Configure Firefox for headless mode
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      },
    },
  });
};
