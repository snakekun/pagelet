/**
 * Created by snake on 2016/1/1.
 */

'use strict';

var fs = require('fs');
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

function loadTempalte(template){
  var key = getKey(template);
  var tpl = cache.get(key);
  if(tpl){
    return tpl;
  }
  try{
    tpl = fs.readFileSync(lookup(key)).toString();
    if(tpl){
      cache.set(key, tpl);
      return tpl;
    }
  }catch(e){
    console.error('load template error ' + e);
  }
}

function getKey(template) {
  var ext = Config.getConfig(Key.TPLEXT);
  return ext ? template + ext : template + '.html';
}

function lookup(name) {
  var dir = Config.getConfig(Key.TPLDIR);
  var baseDir = Config.getConfig(Key.DIR) ? Config.getConfig(Key.DIR) : dirname('./');
  return dir ? resolve(baseDir, dir+name) : resolve(baseDir, name);
};

module.exports = {
  load: loadTempalte
};