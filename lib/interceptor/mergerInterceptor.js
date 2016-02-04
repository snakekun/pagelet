/**
 * Created by snake on 2016/1/1.
 */

'use strict';

var viewResolver = require('./../viewResolver/viewResolver');
var Config = require('./../config/config');
var Key = require('./../constants/key')

module.exports = function* mergerInterceptor(invocation) {
  yield invocation.invokeNext();

  var pagelet = invocation.pagelet;
  var configTimeout = Config.getConfig(Key.TIMEOUT);
  var customTimeout = invocation.params.timeout;
  var timeout = customTimeout ? customTimeout : configTimeout;
  var resultCode = yield pagelet.getResult(timeout ? timeout : 3000);
  var html = '';
  if (resultCode && resultCode === 'success') {
    html = viewResolver.render(invocation.tpl, pagelet.getModelMap());
  }
  invocation.html = html;
  return resultCode;
}