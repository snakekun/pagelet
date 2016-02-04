/**
 * Created by snake on 2016/1/2.
 */
module.exports = function*(param, modelMap) {
  if (!param.time == 0) {
    yield new Promise(function (resolve) {
      setTimeout(resolve, param.time);
    });
  }
  console.log('111');
  throw  new Error('111111');
  console.log('2222');
  modelMap.put('lala', param.lala);
  modelMap.put('hehe', param.haha);
  console.log(new Date().getTime() + 'test2--------success');
  return 'success';
};
