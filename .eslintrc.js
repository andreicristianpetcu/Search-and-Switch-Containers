module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script',
  },
  globals: {
    browser: 'readonly',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  overrides: [
    {
      files: ['test/**/*.js'],
      env: {
        jasmine: true,
        node: true,
      },
      globals: {
        sinon: 'readonly',
        assert: 'readonly',
        global: 'writable',
      },
    },
  ],
};