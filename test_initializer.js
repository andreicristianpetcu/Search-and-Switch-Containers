const chrome = require('sinon-chrome/extensions');
const browser = require('webextension-polyfill');

global.chrome = chrome;
global.browser = browser;

console.log("initializing tests");