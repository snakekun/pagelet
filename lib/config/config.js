/**
 * Created by snake on 2016/1/3.
 */
var yaml = require('js-yaml');
var fs = require('fs');

var proto = module.exports = function (){
  this.__proto__ = proto;
  this.doc = {};
  this.inited = false;
  init();
  return this;
}()

function init (){
  if(this.inited){
    return;
  }
  this.doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
  this.inited = true;
}

proto.getConfig = function(key){
  if(!this.inited){
    init();
  }
  return this.doc[key];
}