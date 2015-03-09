/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    Posts = App.require('/models/modules/posts');

router.route('/posts/:id?')
.post(auth.creds, function (req, res, next) {
  var post = new Posts({
    creator:  req.headers._id,
    title:    req.body.title,
    slug:     req.body.slug,
    category: req.body.category,
    body:     req.body.body
  });
  post.save(function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
})
.get(function (req, res, next) {
  if (req.params.id && req.params.id !== 'galleries') {
    Posts.findOne({'_id':req.params.id},function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  }else{
    Posts.find(function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
      
    });
  }
})
.put(auth.creds, function (req, res, next) {
  Posts.findOne({'_id': req.body._id}, function(err, doc){
    if (err) {return next(err);}
    doc.title = req.body.title || doc.title;
    doc.slug =  req.body.slug  || doc.slug;
    doc.body =  req.body.body  || doc.body;
    doc.category = req.body.category || doc.category;
    doc.save(function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  });
})
.delete(auth.creds, function (req, res, next) {
  Posts.remove({'_id': req.body._id}, function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
});





module.exports = router;
