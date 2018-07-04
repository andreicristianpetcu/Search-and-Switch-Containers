const chrome = require('sinon-chrome/extensions');
const browser = require('webextension-polyfill');

global.chrome = chrome;
global.browser = browser;

window.chrome = chrome;
window.browser = browser;

browser.omnibox.setDefaultSuggestion = sinon.spy();
browser.omnibox.onInputChanged.addListener = sinon.spy();
browser.contextualIdentities = {};

console.log("initializing tests");