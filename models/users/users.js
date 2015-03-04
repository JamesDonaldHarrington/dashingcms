var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    REQUIRED_PASSWORD_LENGTH = 8,
    ub = App.require('/helpers/ub');

function emailValidation (candidate){
  return /^[a-zA-Z0-9_.+-]{1,50}@[a-zA-Z0-9-]{1,50}\.[a-zA-Z0-9-.]{1,10}$/.test(candidate);
}

function stringLength(value){
  return value && value.length >= REQUIRED_PASSWORD_LENGTH
};

UserSchema = new mongoose.Schema({
  created: {type:Number, default: Date.now()},
  firstName:{type: String, required: [true, 'First Name is required', 'test']},
  lastName: {type: String, required: [true, 'Last Name is required']},
  email: {type: String, required: [true, 'Email address is required'], unique:[true, 'That email already exists'], validate: [emailValidation, 'This is not a valid email'] },
  password: {type: String, required: true, validate: [stringLength, 'is too short (minimum length is ' + REQUIRED_PASSWORD_LENGTH + ' characters)']},
  salt : String,
  token: String,
  lastLogin: Number,
  loginAttempts: { type: Number, required: true, default: 0 },
  lockedUntil: Number
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
      user.salt = salt
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

