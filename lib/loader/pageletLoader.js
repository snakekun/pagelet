/**
 * Created by snake on 2016/1/1.
 */
var path = require('path');
var dirname = path.dirname;
var resolve = path.resolve;
var Config = require('./../config/config');
var Key = require('./../constants/key');

var cache = {
  _data: {},
  set: function (key, val) {
    this._data[key] = val;
  },
  get: function (key) {
    return this._data[key];
  },
  reset: function () {
    this._data = {};
  }
};

module.exports = {
  load: loadPagelet
}

function loadPagelet(pagelet) {
  var key = getKey(pagelet);
  var pagelet = cache.get(key);
  if (pagelet) {
    return pagelet;
  }

  try {
    pagelet = require(lookup(key));
    if (pagelet) {
      cache.set(key, pagelet);
      return pagelet;
    }
  } catch (e) {
    console.error('load pagelet error' + e);
  }
}

function getKey(pagelet) {
  var ext = Config.getConfig(Key.PAGELETEXT);
  return ext ? pagelet + ext : pagelet + '.js';
}

function lookup(name) {
  var dir = Config.getConfig(Key.PAGELETDIR);
  return dir ? resolve(dirname('./'), dir+name) : resolve(dirname('./'), name);
};