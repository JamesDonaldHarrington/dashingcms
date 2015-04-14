/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    // ub = App.require('/helpers/ub'),
    Users = App.require('/models/users/users');

router.route('/users/:id?', auth.creds)
.get(auth.creds, function (req, res, next) {
  Users.find(function(err, doc){
  	if (err) {return next(err);}
  	res.success(doc);
  });
})
.post(function (req, res, next) {

  if (err) {return next(err);}
  user = new Users({
    email:         req.body.email,
    password:      req.body.password,
    givenName:     req.body.givenName,
    familyName:    req.body.familyName,
    accessibility: req.body.accessibility
  });

  crypto.randomBytes(48, function(ex, buf) {
    user.token = buf.toString('hex');
    user.save(function(err, doc){
      if (err) {return next(err) };
      req.user = doc;
      res.success(doc, {message:'User Successfully created'});
    });
  });
})
.put(auth.creds, function (req, res, next) {
   Users.findOne({'_id': req.body._id}, function(err, doc){
   	if (err){return next(err);} 
    if (!doc){err = new Error('This user does not exist'); err.status = 400; return next(err);}
    doc.comparePassword(req.body.password, function(err, desc) {
      if (desc) {
		    if (err) {return next(err);}
		    
		    doc.email = req.body.email || doc.email;
		    doc.givenName = req.body.givenName || doc.givenName;
		    doc.familyName = req.body.familyName || doc.familyName;
		   	if (req.body.newPassword) 
		   		{doc.password = req.body.newPassword; }

		    doc.save(function(err, doc){
		      if (err) {return next(err);}
		      res.success(doc);
		    });

	  	}
	  });
  });
})
.delete(auth.creds, function (req, res, next) {
  Users.remove({'_id': req.body._id, email:req.body.email}, function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
});


module.exports = router;
