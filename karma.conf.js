module.exports = function (config) {
  config.set({
    files: [
      'test/test_initializer.js',
      'background.js',
      'test/**/*.spec.js'
    ],
    browsers: ['Firefox'],
    reporters: ['progress', 'coverage'],
    frameworks: ['jasmine', 'sinon', 'sinon-chrome', 'chai'],
    preprocessors: {
      'test/test_initializer.js': ['webpack'],
      'test/**/*.spec.js': ['webpack']
    },
    babelPreprocessor: {
      options: {
        presets: ['env'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  })
}