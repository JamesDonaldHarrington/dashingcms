/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    Galleries = App.require('/models/actions/galleries');

router.route('/galleries/:id?')

.post(auth.creds, function (req, res, next) {
  var gallery = new Galleries({
    title: req.body.payload.title,
    slug: req.body.payload.slug,
    category: req.body.payload.category,
    header: req.body.payload.header,
  });
  gallery.save(function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
})

.get(function (req, res, next) {
  console.log(req.params);
  if (req.params.id && req.params.id !== 'galleries') {
    Galleries.findOne({"_id":req.params.id},function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  }else{
    Galleries.find(function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  }
})

.put(auth.creds, function (req, res, next) {
  Galleries.findOne({'_id': req.body.payload._id}, function(err, doc){
    if (err) {return next(err);}    
    doc.title = req.body.payload.title || doc.title,
    doc.slug = req.body.payload.slug || doc.slug,
    doc.category = req.body.payload.category || doc.category,
    doc.header = req.body.payload.header || doc.header,

    doc.save(function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  });
})

.delete(auth.creds, function (req, res, next) {
  Galleries.remove({'_id': req.body.payload._id}, function(err, doc){
    if (err) {return next(err);}
    res.success(doc)
  });
});


module.exports = router;
