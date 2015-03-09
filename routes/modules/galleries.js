/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    ub = App.require('/helpers/ub'),
    Galleries = App.require('/models/modules/galleries');

router.route('/galleries/:id?')

.post(auth.creds, function (req, res, next) {
  var gallery = new Galleries({
    title:    req.body.title,
    slug:     req.body.slug,
    category: req.body.category,
    header:   req.body.header,
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
  Galleries.findOne({'_id': req.body._id}, function(err, doc){
    if (err) {return next(err);}    
    doc.title =    req.body.title || doc.title,
    doc.slug =     req.body.slug || doc.slug,
    doc.category = req.body.category || doc.category,
    doc.header =   req.body.header || doc.header,

    doc.save(function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  });
})

.delete(auth.creds, function (req, res, next) {
  Galleries.remove({'_id': req.body._id}, function(err, doc){
    if (err) {return next(err);}
    res.success(doc)
  });
});


module.exports = router;
