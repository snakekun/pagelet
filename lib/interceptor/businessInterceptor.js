/**
 * Created by snake on 2016/1/1.
 */
var co = require('co');

module.exports = function (invocation) {
  invocation.invokeNext();

  var fn = invocation.fn;
  var params = invocation.params;
  var pagelet = invocation.pagelet;
  if (params) {
    pagelet.bindParam(params);
  }
  try {
    co(pagelet.doBusiness(fn))
      .then(function (resultCode) {
        pagelet.setResult(resultCode);
      });
  } catch (e) {
    console.error('businessInterceptor error ' + e);
    return pagelet.resultCode.none;
  }
  return pagelet.resultCode.success;
};