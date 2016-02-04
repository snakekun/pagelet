/**
 * Created by snake on 2016/1/1.
 */

'use strict';

var co = require('co');

module.exports = function *businessInterceptor(invocation) {
  yield invocation.invokeNext();

  var fn = invocation.fn;
  var params = invocation.params;
  var pagelet = invocation.pagelet;
  if (params) {
    pagelet.bindParam(params);
  }
  co(pagelet.doBusiness(fn))
    .then(function (resultCode) {
      pagelet.setResult(resultCode);
    });
  return pagelet.resultCode.success;
};