var mongoose = require('mongoose'),
    slug = require('slug'),
    ub = App.require('/helpers/ub');


InquiriesSchema = new mongoose.Schema({
  created: {type:Number, default: Date.now()},
  firstName:String,
  lastName:String,
  email:String,
  phone:String,
  message:String,
  age:String,
  gender:String
});


 
Inquiries = module.exports = mongoose.model('Inquiry', InquiriesSchema);

