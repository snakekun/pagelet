/**
 * Created by snake on 2016/1/1.
 */
'use strict';

var Config = require('./lib/config/config');
var controller = require('./lib/controller');

module.exports = {
  init : Config.init,
  render: function*(pageleName, params){
    return controller.render(pageleName, params)
  }
}