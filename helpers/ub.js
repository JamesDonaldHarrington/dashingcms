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

ub.editCmsSettings = function(file, obj, val, cb) {
  var loadFile = file, saveFile = file, backingup = false;
  if (this.isArray(file)) 
    {loadFile = file[0]; saveFile = file[1]; backingup = true;}

  fs.readFile(loadFile, 'utf-8', function(err, data){
    if (err){ throw err; }
    if(!backingup){
      data = JSON.parse(data);
      arr = obj.split('.');
      for (var i = 0; i < arr.length; i++) {
        data[arr[i]]=val;
      }
      data = JSON.stringify(data,null,2);
    }
    fs.writeFile(saveFile, data, 'utf-8', function (err) {
      if (err){ throw err; }
      (cb ? cb(jsonData) : console.log('filelistAsync complete') );
    });
  });
};

ub.backupCmsSettings = function(cb){
  return ub.editCmsSettings(['config/cmsSettings.json', 'config/cmsSettings-backup.json'], null, null, cb);
}
