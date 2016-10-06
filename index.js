'use strict';

var Addons = require('./lib/Addons');
var Color = require('./lib/Color');
var Display = require('./lib/Display');
var GlobalStylesheets = require('./lib/GlobalStylesheets');

var assign = require('object-assign');
var createCSS = require('./lib/createCSS');
var curry = require('./curry');
var invariant = require('invariant');

var index = assign({
  curry: curry,
  install: GlobalStylesheets.install,
  injectAutoprefixer: function(autoprefix) {
    invariant(typeof autoprefix === 'function', 'You may only inject functions for autoprefix');
    createCSS.injection.autoprefix = autoprefix;
  },
  injectClassNameStrategy: function(getStylesheetId, formatClassNameFromStylesheet) {
    if (getStylesheetId) {
      invariant(typeof getStylesheetId === 'function', 'getStylesheetId must be a function');
      GlobalStylesheets.injection.getStylesheetId = getStylesheetId;
    }

    if (formatClassNameFromStylesheet) {
      invariant(typeof formatClassNameFromStylesheet === 'function', 'formatClassNameFromStylesheet must be a function');
      GlobalStylesheets.injection.formatClassNameFromStylesheet = formatClassNameFromStylesheet;
    }
  },
}, Color, Display, Addons);

module.exports = index;
