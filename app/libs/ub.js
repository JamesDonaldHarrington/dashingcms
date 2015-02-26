var ub = module.exports = {};


ub.isArray = function(val){
  return (Object.prototype.toString.call(val) === '[object Array]'? true: false)
};
ub.isObject = function(val){
  return (Object.prototype.toString.call(val) === '[object Object]'? true: false)
};
ub.isString = function(val){
  return (Object.prototype.toString.call(val) === '[object String]'? true: false)
};
ub.isNumber = function(val){
  return /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/.test(val)
};

ub.simpleClone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}

ub.err = function(err, status, display, opt ){
  return err;
}
