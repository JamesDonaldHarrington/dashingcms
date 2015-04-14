/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    // ub = App.require('/helpers/ub'),
    Galleries = App.require('/models/modules/galleries');

router.route('/galleries/:_id?')

.post(auth.creds, function (req, res, next) {
  var gallery = new Galleries({
    title:    req.body.title,
    slug:     req.body.slug,
    images:   req.body.images,
    category: req.body.category,
    header:   req.body.header
  });
  gallery.save(function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
})

.get(function (req, res, next) {
  if (req.params._id) {
    Galleries.findOne({'_id':req.params._id},function(err, doc){
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
    if (req.body.title)     {doc.title =    req.body.title;}
    if (req.body.slug)      {doc.slug =     req.body.slug;}
    if (req.body.images)    {doc.images =   req.body.images;}
    if (req.body.category)  {doc.category = req.body.category;}
    if (req.body.header)    {doc.header =   req.body.header;}

    doc.save(function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  });
})

.delete(auth.creds, function (req, res, next) {
  Galleries.remove({'_id': req.params._id}, function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
});


module.exports = router;
