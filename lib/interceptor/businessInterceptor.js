/**
 * Created by snake on 2016/1/1.
 */

'use strict';

var co = require('co');
var Config = require('./../config/config');
var Key = require('./../constants/key')

module.exports = function *businessInterceptor(invocation) {
  yield invocation.invokeNext();

  var fn = invocation.fn;
  var params = invocation.params;
  var pagelet = invocation.pagelet;
  if (params) {
    pagelet.bindParam(params);
  }

  var timeoutId;
  var configTimeout = Config.getConfig(Key.TIMEOUT);
  var customTimeout = invocation.params.timeout;
  var timeout = customTimeout ? customTimeout : configTimeout;
  var resultCode = yield Promise.race([
    new Promise((resolve, reject) => {
      timeoutId = setTimeout(function() {
        resolve('none');
      }, timeout? timeout : 3000);
    }),
    co(pagelet.doBusiness(fn))
  ]);
  clearTimeout(timeoutId);
  return resultCode;
};