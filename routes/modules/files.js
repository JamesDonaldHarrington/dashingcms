var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    multer = require('multer'),
    slug = require('slug'),
    fs = require('fs'),
    Files = App.require('/models/modules/files');

router.route('/files')
.post(auth.creds,[multer({dest: './uploads', rename: function (fieldname, filename) {return slug(filename).toLowerCase() + Date.now() }, putSingleFilesInArray: true }),  
function(req, res, next){
  console.log(req.files)
  file = new Files({
    galleries:req.galleries,
    title:req.body.title,
    fileName: req.files.fileUpload[0].name,
    category: req.body.category,
    note:req.body.note,
    text:req.body.text,
    info:req.body.info || []
  });
  file.save(function(err, doc){
    if (err) {return next(err);}
    console.log(req.body);
    res.success({files:req.files, body:req.body});
  })
}])
.get(function (req, res, next) {
  Files.find(function(err, doc){
    if (err) {return next(err);}
    res.success(doc)
  });
})
.delete(auth.creds, function (req, res, next) {
  Files.findOne({_id:req.body._id}, function(err, doc){
    if (err) {return next(err);}
    var fileToDelete = doc;
    Files.remove({'_id': req.body._id}, function(err, doc){
      if (err) {return next(err);}
      if (!fileToDelete) {err = new Error('file data does not exist'); err.status=400; return next(err);}
      fs.unlink(App.root+'/uploads'+fileToDelete.fileName, function (err) {
        if (err) {return next(err);}
        console.log('successfully deleted '+fileToDelete.fileName);
        res.success(doc);
      });
    });
  })
});


module.exports = router;
