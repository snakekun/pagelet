/**
 * Created by snake on 2016/1/1.
 */

'use strict';

var ejs = require('ejs');

function render(template,data){
    return ejs.render(template, data);
}

module.exports = {
    render: render
};