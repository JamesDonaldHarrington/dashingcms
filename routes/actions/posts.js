/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    Posts = App.require('/models/actions/posts');

router.route('/posts/:id?')
.post(auth.creds, function (req, res, next) {
  var post = new Posts({
    title: req.body.payload.title,
    slug: req.body.payload.slug,
    category: req.body.payload.category,
    body: req.body.payload.body
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
  Posts.findOne({'_id': req.body.payload._id}, function(err, doc){
    if (err) {return next(err);}
    doc.title = req.body.payload.title || doc.title;
    doc.slug = req.body.payload.slug || doc.slug;
    doc.body = req.body.payload.body || doc.body;
    doc.category = req.body.payload.category || doc.category;
    doc.save(function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  });
})
.delete(auth.creds, function (req, res, next) {
  Posts.remove({'_id': req.body.payload._id}, function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
});





module.exports = router;
