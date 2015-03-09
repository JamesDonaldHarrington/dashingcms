/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    Inquiries = App.require('/models/modules/inquiries');

router.route('/inquiries/:id?')
.post(function (req, res, next) {
  var inq = new Inquiries({
    givenName: req.body.givenName,
    familyName: req.body.familyName,
    email:   req.body.email,
    phone:   req.body.phone,
    message: req.body.message,
    age:     req.body.age,
    gender:  req.body.gender
  });
  inq.save(function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
})
.get(auth.creds, function (req, res, next) {
  Inquiries.find(function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
})
.delete(auth.creds, function (req, res, next) {
  Inquiries.remove({_id:req.body._id}, function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
});


module.exports = router;
