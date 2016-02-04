/**
 * Created by snake on 2016/1/2.
 */

'use strict';

var Pagelet = require('./pagelet');
var TemplateLoader = require('./loader/templateLoader');
var PageletLoader = require('./loader/pageletLoader');
var Invocation = require('./invocation');
var Interceptor = require('./interceptor/interceptor');

var co = require('co');

var proto = module.exports = function () {
  this.__proto__ = proto;
  return this;
}

proto.render = function render(pageletName, params) {
  if (!pageletName) {
    return;
  }
  try {
    var fn = PageletLoader.load(pageletName);
    var tpl = TemplateLoader.load(pageletName);
    var invocation = new Invocation(fn, tpl, params, Interceptor.matchInterceptor(pageletName));
    var pagelet = new Pagelet();
    invocation.pagelet = pagelet;
  } catch (e) {
    console.log('controller prepar error '+ e);
  }

  return co(function*() {
    try{
      var resultCode = yield invocation.invokeNext();
      var html = '';
      if (resultCode && resultCode === 'success') {
        html = invocation.html;
      }
      return html;
    }catch(e){
      console.log('controller process error '+ e);
      return '';
    }

  });

}


