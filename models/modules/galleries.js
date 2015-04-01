var mongoose = require('mongoose'),
    // ub = App.require('/helpers/ub'),
    slug = require('slug'),


GalleriesSchema = new mongoose.Schema({
  created:  {type:Number, default: Date.now()},
  title:    {type:String, required:[true, 'Please supply a title']},
  images:    [{
  _id: {type:String},
  caption:{type:String},
  position:{type:Number}
  }],
  slug:     String,
  category: String,
  header:   String
});



GalleriesSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = slug(this.title);
    next();
  }
  next();
});




module.exports = mongoose.model('Gallery', GalleriesSchema);

