## pagelet4n
render page

## Installation

```bash
$ npm install pagelet4n
```

## Usage

first of all, we need a config file `config.yaml` it will be like this:

```js
timeout: 3000                  //pagelet process timeout unit second  not required default 3000
pageletDir: ./pagelet/         //pagelet file dir not required default ./
pageletExt: pagelet.js         //pagelet file ext not required default ./
tplDir: ./tpl/                 //template file dir not required default ./
tplExt: .html                  //template file ext not required default ./
interceptorfactory:            //interceptor factory  not required default [merger,business]
  business: ./interceptor/businessInterceptor  //customInterceptor basedir is pagelet.init(basedir), key is for stack
  merger: ./interceptor/mergerInterceptor
stack:  [merger,business]     //interceptor stack  not required default [merger,business]
```

### with koa 

in server.js or app.js
```js
var koa = require('koa');
var path = require('path');
var pagelet = require('pagelet4n');

var app = koa();
pagelet.init(path.resolve('./'));
app.use(pagelet.middleware);
```

in action
```js
var html =  yield { 
  'header': this.pagelet('header',{code:200}),
  'main': this.pagelet('main',{code:200}),
  'footer': this.pagelet('footer',{code:200}),
  };
```


### standalone
init
```js
var path = require('path');
var pagelet = require('pagelet4n');

pagelet.init(path.resolve('./'));
```

usage
```js
var pagelet = require('pagelet4n');

var html =  yield { 
  'header': pagelet.render('header',{code:200}),
  'main': pagelet.render('main',{code:200}),
  'footer': pagelet.render('footer',{code:200}),
  };
```
