/**
 * Created by snake on 2016/1/1.
 */

'use strict';

var Interceptor = require('./interceptor/interceptor');

var proto = module.exports = function (fn, tpl, params, interceptors) {
  this.__proto__ = proto;
  this.interceptors = interceptors;
  this.fn = fn;
  this.tpl = tpl;
  this.params = params;
  this.html = '';
  this.pagelet = {};
  this.iterator = this.invoke();
  return this;
}

proto.invoke = function* () {
  for (var i = 0; i < this.interceptors.length; i++) {
    yield Interceptor.getInterceptor(this.interceptors[i]);
  }
}

proto.invokeNext = function *(){
  var ret = this.iterator.next();
  if(!ret.done){
    return yield ret.value(this);
  }
}