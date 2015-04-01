var mongoose = require('mongoose'),
    // slug = require('slug'),
    // ub = App.require('/helpers/ub'),

FilesSchema = new mongoose.Schema({
  created:   {type:Number, default: Date.now()},
  title:     {type:String, required:[true, 'Please supply a title']},
  fileName:  String,
  path:      String,
  category:  [{type:String}],
  note:      String,
  text:      String,
  info:      [{
              label:String,
              text:String
             }]
});


FilesSchema.pre('save', function(next) {
  if (!this.path) {
    this.path = '/uploads/'+this.fileName;
    next();
  }
  next();
});

module.exports = mongoose.model('File', FilesSchema);
