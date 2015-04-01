/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    multer = require('multer'),
    slug = require('slug'),
    fs = require('fs'),
    Files = App.require('/models/modules/files');

router.route('/files/:_id?')
.post(auth.creds, function(req, res, next){
  var filetype = req.body.file.filetype
  var fileName = slug(req.body.title+'--'+Date.now() )+'.' + filetype.substring(filetype.indexOf('/')+1);
  console.log(fileName);
  var file = new Files({
    title:     req.body.title,
    fileName:  fileName,
    category:  req.body.category,
    note:      req.body.note,
    text:      req.body.text,
    info:      req.body.info || []
  });
  fs.writeFile('uploads/'+fileName, new Buffer(req.body.file.base64, "base64"), function(err) {
    if (err) {return next(err);}
    file.save(function(err, doc){
      if (err) {return next(err);}
      req.body.file.base64 = "Cleared"
      console.log(req.body);
      res.success(doc);
    });
  });
})
.get(function (req, res, next) {
  Files.find(function(err, doc){
    if (err) {return next(err);}
    res.success(doc.reverse());
  });
})
.delete(auth.creds, function (req, res, next) {
  Files.findOne({_id:req.params._id}, function(err, doc){
    if (err) {return next(err);}
    var fileToDelete = doc;
    Files.remove({'_id': req.params._id}, function(err, doc){
      if (err) {return next(err);}
      if (!fileToDelete) {err = new Error('file data does not exist'); err.status=400; return next(err);}
      fs.unlink(App.root+'/uploads/'+fileToDelete.fileName, function (err) {
        if (err) {return next(err);}
        console.log('successfully deleted '+fileToDelete.fileName);
        res.success(doc);
      });
    });
  });
});


module.exports = router;
