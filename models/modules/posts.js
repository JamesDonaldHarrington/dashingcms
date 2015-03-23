var mongoose = require('mongoose'),
    // ub = App.require('/helpers/ub'),
    slug = require('slug'),

PostsSchema = new mongoose.Schema({
  created:  {type:Number, default: Date.now()},
  creator:  {type:String, required:[true, 'Please supply a creator Object Id']},
  title:    {type:String, required:[true, 'Please supply a title']},
  slug:     String,
  category: [{type:String}],
  status:   {type:String, required:[true, 'Please supply a status']},
  body:     {type:String, required:[true, 'Please supply a body']},
});



PostsSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = slug(this.title);
    next();
  }
  next();
});





module.exports = mongoose.model('Post', PostsSchema);

