var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    REQUIRED_PASSWORD_LENGTH = 8,
    pwGen = require('password-generator'),
    ub = App.require('/helpers/ub');

function emailValidation (candidate){
  return /^[a-zA-Z0-9_.+-]{1,50}@[a-zA-Z0-9-]{1,50}\.[a-zA-Z0-9-.]{1,10}$/.test(candidate);
}

function stringLength(value){
  return value && value.length >= REQUIRED_PASSWORD_LENGTH
};

UserSchema = new mongoose.Schema({
  created: {type:Number, default: Date.now()},
  givenName:{type: String},
  familyName: {type: String},
  email: {type: String, required: [true, 'Email address is required'], unique:[true, 'That email already exists'], validate: [emailValidation, 'This is not a valid email'] },
  password: {type: String, required: true, validate: [stringLength, 'is too short (minimum length is ' + REQUIRED_PASSWORD_LENGTH + ' characters)']},
  token: String,
  lastLogin: Number,
  loginAttempts: { type: Number, required: true, default: 0 },
  lockedUntil: Number,
  accessibility:{type:String, default:'owner'}
});



UserSchema.pre('save', function(next) {
  var user = this;
  var tempPassword = (user.password === 'tempPassword-DpKlHZRPUshEDLRz9sUv' ?  generatePassword(15, false) : undefined) // -> foo-67390298: undefined)
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(tempPassword || user.password, salt, function(err, hash) {
      if (err) return next(err);
      req.tempPassword = tempPassword;
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

