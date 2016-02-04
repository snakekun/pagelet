/**
 * Created by snake on 2016/1/2.
 */

'use strict';

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

proto.doBusiness = function *(fn) {
  try{
    return yield fn(this.paramMap, this.modelMap) || this.resultCode.none;
  } catch(e){
    console.log(e);
    return this.resultCode.none;
  }

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
proto.resultCode = {
  success:'success',
  none:'none'
}