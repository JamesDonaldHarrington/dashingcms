/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    Users = App.require('/models/users/users'),
    Rolls = App.require('/models/modules/rolls');

router.route('/rolls/:_id?', auth.creds)
.post(function (req, res, next) {
  var permission = new Rolls({
    title:  req.body.title,
    access: req.body.access
  });
  permission.save(function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
})

.get(function (req, res, next) {
  Rolls.find(function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
})

.put(auth.creds, function (req, res, next) {
  Rolls.findOne({'_id': req.params._id}, function(err, doc){
    if (err) {return next(err);}
    if (req.body.title  !== doc.title)       {doc.title =       req.body.title;}
    if (req.body.access)       {doc.access =       req.body.access;}

    doc.save(function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  });
})
.delete(auth.creds, function (req, res, next) {
  var _id = req.params._id;
  Rolls.findOne({_id:_id}, function(err, doc){
    if (err) {return next(err);}
    var rollToDelete = doc;
    if (!rollToDelete) {err = new Error('That roll does not exist'); err.status=400; return next(err);}
      Rolls.remove({'_id': _id}, function(err, doc){
        if (err) {return next(err);}
          
          Users.find({'accessibility': rollToDelete.title}).stream()
          .on('data', function(doc){
            doc.accessibility = 'none';
            doc.save();
          })
          .on('error', function(err){ if (err) {return next(err);} })
          .on('end', function(){ res.success(rollToDelete); });

      });
  });
});





module.exports = router;
