/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    multer = require('multer'),
    slug = require('slug'),
    fs = require('fs'),
    Files = App.require('/models/modules/files'),
    Galleries = App.require('/models/modules/galleries');

router.route('/files/:_id?')
.post(auth.creds, function(req, res, next){
  if (req.body.file.filename.indexOf('.') == -1) {
    var err = new Error('Bad extension please use a file that has an extension')
    err.type = 'danger', err.status = 400;
    return next(err);
  }
  var filename = req.body.file.filename
  var ext = filename.substring(filename.indexOf('.')+1)
  console.log(req.body.file)
  var fileName = slug(req.body.title+'--'+Date.now() )+'.' + ext;
  console.log(fileName);
  var file = new Files({
    title:     req.body.title,
    fileName:  fileName,
    extension: ext,
    filetype:  req.body.file.filetype,
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
  var _id = req.params._id;
  Files.findOne({_id:_id}, function(err, doc){
    if (err) {return next(err);}
    var fileToDelete = doc;
    if (!fileToDelete) {err = new Error('file data does not exist'); err.status=400; return next(err);}
    Files.remove({'_id': req.params._id}, function(err, delDoc){
      if (err) {return next(err);}
      fs.unlink(App.root+'/uploads/'+fileToDelete.fileName, function (err) {
        if (err) {return next(err);}
        console.log('Here')
        
        Galleries.find({"images._id": {$in : [_id] }}).stream()
        .on('data', function(doc){
          console.log(err, doc)
          var ind = doc.images.map(function(obj, index) {
              if(obj._id == _id) { return index; }
          }).filter(isFinite)
          doc.images.splice(ind,1)
          doc.save();
        })
        .on('error', function(err){
          if (err) {return next(err);}
        })
        .on('end', function(){
          console.log('successfully deleted '+fileToDelete.fileName);
          res.success(delDoc);
        });

      });
    });
  });
});


module.exports = router;
