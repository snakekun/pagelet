/**
 * Created by snake on 2016/1/2.
 */
module.exports = function*(param, modelMap) {
  if (!param.time == 0) {
    yield new Promise(function (resolve) {
      setTimeout(resolve, param.time);
    });
  }
  modelMap.put('lala', param.lala);
  modelMap.put('hehe', param.haha);
  return 'success';
};
