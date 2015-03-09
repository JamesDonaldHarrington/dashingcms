var mongoose = require('mongoose'),
    slug = require('slug'),
    ub = App.require('/helpers/ub');


GalleriesSchema = new mongoose.Schema({
  created:  {type:Number, default: Date.now()},
  title:    {type:String, required:[true, 'Please supply a title']},
  slug:     String,
  category: String,
  header:   String
});



GalleriesSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = slug(this.title);
    next();
  };
  next();
});





Page = module.exports = mongoose.model('Gallery', GalleriesSchema);

