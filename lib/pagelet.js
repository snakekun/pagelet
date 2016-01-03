/**
 * Created by snake on 2016/1/2.
 */
var _ = require('underscore');
var co = require('co');

var proto = module.exports = function () {
  this.__proto__ = proto;
  this.paramMap = {};
  this.modelMap = {
    _data: {},
    put: function (key, val) {
      this._data[key] = val;
    },
    get: function (key) {
      return this._data[key];
    }
  };
  this.result = {code: ''};
  return this;
};

proto.doBusiness = function (fn) {
  return fn(this.paramMap, this.modelMap) || 'none';
}

proto.getModelMap = function () {
  return this.modelMap._data;
}

proto.bindParam = function (data) {
  _.extend(this.paramMap, data);
}
proto.setResult = function (resultCode) {
  this.result.code = resultCode;
}
proto.getResult = function *(timeout) {
  var start = new Date().getTime();
  for (; ;) {
    if (this.result.code) {
      return this.result.code;
    } else {
      var now = new Date().getTime();
      yield new Promise(function (resolve) {
        setTimeout(resolve, 1);
      });
      if (now - start > timeout) {
        return 'none';
      }
    }
  }
}
proto.resultCode = {
  success:'success',
  none:'none'
}