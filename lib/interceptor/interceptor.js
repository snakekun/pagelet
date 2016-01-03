/**
 * Created by snake on 2016/1/3.
 */
var Config = require('./../config/config');
var Key = require('./../constants/key');
var path = require('path');
var dirname = path.dirname;
var resolve = path.resolve;

var proto = module.exports = function () {
  this.__proto__ = proto;
  this.interceptorFactory = {
    _data: {},
    put: function (key, val) {
      this._data[key] = val;
    },
    get: function (key) {
      return this._data[key];
    }
  };
  this.interceptorFactory.put('merger', require('./mergerInterceptor'));
  this.interceptorFactory.put('business', require('./businessInterceptor'));
  this.inited = false;
  init();
  return this;
}();

function init() {
  if (this.inited) {
    return;
  }
  var interceptors = Config.getConfig(Key.INTERCEPTORFACTORY);
  for (var key in interceptors) {
    try {
      interceptorFactory.put(key, require(lookup(interceptors[key])));
    } catch (e) {
      console.log('init interceptor error' + e);
    }
  }
}

function lookup(name) {
  return resolve(dirname('./'), name);
};

proto.getInterceptor = function (interceptor) {
  return this.interceptorFactory.get(interceptor);
}
proto.matchInterceptor = function (pageletName) {
  var stack = Config.getConfig(Key.STACK);
  return stack ? stack : ['merger', 'business'];
}

