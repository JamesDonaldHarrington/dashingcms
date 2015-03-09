var mongoose = require('mongoose'),
    // slug = require('slug'),
    // ub = App.require('/helpers/ub'),

InquiriesSchema = new mongoose.Schema({
  created: {type:Number, default: Date.now()},
  givenName:  String,
  familyName: String,
  email:      String,
  phone:      String,
  message:    String,
  age:        String,
  gender:     String,
  address:    String,
  city:       String,
  state:      String,
  zip:        String
});


 
module.exports = mongoose.model('Inquiry', InquiriesSchema);

