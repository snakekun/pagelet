/**
 * Created by snake on 2016/1/3.
 */
var yaml = require('js-yaml');
var fs = require('fs');
var doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
var s =  doc.interceptorfactory;
console.log(s);
s.map(function(e){
  console.log(e);
});