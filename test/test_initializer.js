const chrome = require('sinon-chrome/extensions');
const browser = require('webextension-polyfill');

global.chrome = chrome;
global.browser = browser;

window.chrome = chrome;
window.browser = browser;

console.log("initializing tests");