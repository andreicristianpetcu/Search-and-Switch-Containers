module.exports = function (config) {
  config.set({
    files: [
      // 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
      'background.js',
      'test/**/*.js'
    ],
    browsers: ['Firefox'],
    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],
    frameworks: ['jasmine', 'sinon', 'sinon-chrome'],
    preprocessors: {
      'test/**/*.js': ['webpack']
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