var ub = module.exports = {};
var fs = require('fs');

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
};

ub.err = function(ere){
  return err;
};

ub.stringToJson = function(str){
  var equal = str.lastIndexOf('=')
  var value = str.substring(equal+1).trim();
  key = str.substring(0,equal).trim();
  value =  ((/^true$/i).test(value) ? true : value )
  return {key:key, val:value};
};

ub.editJsonFile = function(file, str, cb) {
  var that = this;
  var loadFile = file, saveFile = file, backingup = false;
  if (that.isArray(file)) 
    {loadFile = file[0]; saveFile = file[1]; backingup = true;}

  fs.readFile(loadFile, 'utf-8', function(err, data){
    if (err){ throw err; }
    if(!backingup){
      data = JSON.parse(data);
      arr = str.split('.');
      var keyVal = that.stringToJson(str)
      data[keyVal.key] = keyVal.val
      data = JSON.stringify(data,null,2);
    }
    fs.writeFile(saveFile, data, 'utf-8', function (err) {
      if (err){ throw err; }
      (cb ? cb(data) : console.log('filelistAsync complete') );
    });
  });
};

ub.backupCmsSettings = function(cb){
  return ub.editJsonFile(['config/cmsSettings.json', 'config/cmsSettings-backup.json'], null, cb);
}
ub.editCmsSettings = function(str, cb){
  return ub.editJsonFile('config/cmsSettings.json', str, cb);
}
