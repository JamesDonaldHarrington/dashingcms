var ub = module.exports = {};
var fs = require('fs');

ub.isArray = function(val){
  return (Object.prototype.toString.call(val) === '[object Array]'? true: false);
};
ub.isObject = function(val){
  return (Object.prototype.toString.call(val) === '[object Object]'? true: false);
};
ub.isString = function(val){
  return ( Object.prototype.toString.call(val) === '[object String]'? true: false);
};
ub.isNumber = function(val){
  return /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/.test(val);
};

ub.simpleClone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

ub.err = function(err){
  return err;
};

ub.updateStrToJson = function(str){
  var equal = str.lastIndexOf('=');
  var value = str.substring(equal+1).trim();
  var key = str.substring(0,equal).trim();
  value =  ((/^true$/i).test(value) ? true : value );
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
      // var arr = str.split('.');
      var keyVal = that.updateStrToJson(str);
      data[keyVal.key] = keyVal.val;
      data = JSON.stringify(data,null,2);
    }
    fs.writeFile(saveFile, data, 'utf-8', function (err) {
      if (err){ throw err; }
      return (cb ? cb(data) : console.log('filelistAsync complete') );
    });
  });
};

ub.backupCmsSettings = function(cb){
  return ub.editJsonFile(['config/cmsSettings.json', 'config/cmsSettings-backup.json'], null, cb);
};
ub.editCmsSettings = function(str, cb){
  return ub.editJsonFile('config/cmsSettings.json', str, cb);
};



ub.stripCreds = function stripCreds (obj, keep) {
  if (!obj) {return false;}
  if (!this.isObject(obj) && !this.isArray(obj)) {return obj;}
  var newObj = this.simpleClone(obj);
  var remove = ['password', 'salt', '__v', 'loginAttempts', 'token'];
  var i;
  if ( ub.isArray(newObj) ) 
    { return newObj.map(function(o){ return ub.stripCreds(o, keep); }); }
  if (this.isArray(keep)) {
    for (i = 0; i < keep.length; i++) {
      console.log(remove.indexOf(keep[i]))
      remove.splice(remove.indexOf(keep[i]), 1);
    }
  }
  try{
    for (i = 0; i < remove.length; i++) {
      delete newObj[remove[i]];
    }
  }catch(err){}
  return newObj;
};

