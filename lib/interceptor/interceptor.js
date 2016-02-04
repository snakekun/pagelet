/**
 * Created by snake on 2016/1/3.
 */

'use strict';

var Config = require('./../config/config');
var Key = require('./../constants/key');
var path = require('path');
var dirname = path.dirname;
var resolve = path.resolve;

var inited = false;
var interceptorFactory = {
  _data: {},
  put: function (key, val) {
    this._data[key] = val;
  },
  get: function (key) {
    return this._data[key];
  }
};

function init() {
  if (inited) {
    return;
  }
  interceptorFactory.put('merger', require('./mergerInterceptor'));
  interceptorFactory.put('business', require('./businessInterceptor'));
  // load custom interceptors
  var interceptors = Config.getConfig(Key.INTERCEPTORFACTORY);
  for (var key in interceptors) {
    try {
      interceptorFactory.put(key, require(lookup(interceptors[key])));
    } catch (e) {
      console.log('init interceptor error' + e);
    }
  }
  inited = true;
}

function lookup(name) {
  var dir = Config.getConfig(Key.DIR);
  return resolve(dir? dir : dirname('./'), name);
};

module.exports.getInterceptor = function (interceptor) {
  if(!inited){
    init();
  }
  return interceptorFactory.get(interceptor);
}

module.exports.matchInterceptor = function (pageletName) {
  var stack = Config.getConfig(Key.STACK);
  return stack ? stack : ['merger', 'business'];
}

