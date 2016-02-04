/**
 * Created by snake on 2016/1/1.
 */
var R = require('./../index');
var co = require('co');
var config = require('./../lib/config/config');
var path = require('path');

co(function*() {
    R.init(path.resolve('./'));
    var html = yield {
      h1: R.render('test', {hehe: 3535353, time: 100, name: '1', ll: 2222}),
      h2: R.render('test2', {haha: 55555555,timeout:500, time: 1000, name: '2', nn: 4444}),
      h3: R.render('test', {hehe: 123, timeout:50, time:1000, name: '1', ll: 2222})
    }

    console.log(html);
})


