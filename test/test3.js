/**
 * Created by snake on 2016/1/3.
 */
try{
  function* gen(){
    yield  1;
  }
  var g = gen();
  var ret = g.next();
  while(!ret.done){
    console.log(ret.value);
    //console.log(ret.value);
    ret = g.next();
  }
  ret = g.next();
  console.log(ret);
}catch(e){
  console.log(e);
}
