/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    Posts = App.require('/models/modules/posts');

router.route('/posts/:_id?')
.post(auth.creds, function (req, res, next) {
  var post = new Posts({
    creator:  req.headers.id,
    title:    req.body.title,
    slug:     req.body.slug,
    category: req.body.category,
    status:     req.body.status,
    body:     req.body.body
  });
  post.save(function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
})
.get(function (req, res, next) {
  Posts.find(function(err, doc){
    if (err) {return next(err);}
    res.success(doc.reverse());
  });
})
.put(auth.creds, function (req, res, next) {
  Posts.findOne({'_id': req.body._id}, function(err, doc){
    if (err) {return next(err);}
    doc.title = req.body.title || doc.title;
    doc.slug =  req.body.slug  || doc.slug;
    doc.status =  req.body.status  || doc.status;
    doc.body =  req.body.body  || doc.body;
    doc.category = req.body.category || doc.category;
    doc.save(function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  });
})
.delete(auth.creds, function (req, res, next) {
  Posts.remove({'_id': req.params._id}, function(err, doc){
    if (err) {return next(err);}
    if (!doc){err = new Error('This post does not exist'); err.type='danger',err.status = 400; return next(err);}
    res.success(doc);
  });
});





module.exports = router;
