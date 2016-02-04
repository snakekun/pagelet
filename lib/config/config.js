/**
 * Created by snake on 2016/1/3.
 */
'use strict';

var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

var doc = {};
var inited = false;

var proto = module.exports = function (){
  this.__proto__ = proto;
  return this;
}

proto.getConfig = function(key){
  return doc[key];
}

proto.init = function(dir){
  if(inited){
    return;
  }
  doc = yaml.safeLoad(fs.readFileSync(path.resolve(dir,'config.yaml'), 'utf8'));
  doc['dir'] = dir;
  inited = true;
}