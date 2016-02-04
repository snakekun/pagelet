/**
 * Created by snake on 2016/1/1.
 */

'use strict';

var viewResolver = require('./../viewResolver/viewResolver');

module.exports = function* mergerInterceptor(invocation) {
  var resultCode = yield invocation.invokeNext();
  var pagelet = invocation.pagelet;
  var html = '';
  if (resultCode && resultCode === 'success') {
    html = viewResolver.render(invocation.tpl, pagelet.getModelMap());
  }
  invocation.html = html;
  return resultCode;
}