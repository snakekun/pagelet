/**
 * Created by snake on 2016/1/1.
 */
var viewResolver = require('./../viewResolver/viewResolver');
var Config = require('./../config/config');
var Key = require('./../constants/key')


module.exports = function* (invocation) {
  invocation.invokeNext();

  var pagelet = invocation.pagelet;
  var timeout = Config.getConfig(Key.TIMEOUT);
  var resultCode = yield pagelet.getResult(timeout ? timeout : 3000);
  var html = '';
  if (resultCode && resultCode === 'success') {
    html = viewResolver.render(invocation.tpl, pagelet.getModelMap());
  }
  invocation.html = html;
  return resultCode;
}