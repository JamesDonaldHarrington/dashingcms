var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    ub = require('../../libs/ub');

function emailValidation (candidate){
  return /^[a-zA-Z0-9_.+-]{1,50}@[a-zA-Z0-9-]{1,50}\.[a-zA-Z0-9-.]{1,10}$/.test(candidate);
}


UserSchema = new mongoose.Schema({
  firstName:{type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique:true, validate: [emailValidation, 'is not a valid email'] },
  password: {type: String, required: true},
  token: String,
  lastLogin: Date,
  loginAttempts: { type: Number, required: true, default: 0 },
  lockedUntil: Date
});



UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


User = module.exports = mongoose.model('User', UserSchema);

