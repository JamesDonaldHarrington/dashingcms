var mongoose = require('mongoose'),
    slug = require('slug'),
    ub = App.require('/helpers/ub');


FilesSchema = new mongoose.Schema({
  created: {type:Number, default: Date.now()},
  galleries:[{type:String, required:[true, 'Please select a gallery to put this image in']}],
  title:{type:String, required:[true, 'Please supply a title']},
  fileName:{type:String},
  category:{type:String},
  note:String,
  text:String,
  info:[{
      label:String,
      text:String
  }]
});


File = module.exports = mongoose.model('File', FilesSchema);
