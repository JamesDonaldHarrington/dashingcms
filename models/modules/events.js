var mongoose = require('mongoose'),
    slug = require('slug'),
    ub = App.require('/helpers/ub');


EventsSchema = new mongoose.Schema({
  created: {type:Number, default: Date.now()},
  title:{type:String, required:[true, 'Please supply a title']},
  image:{type:String},
  slug:{type:String},
  category:{type:String, required:[true, 'Please supply a category']},
  body:{type:String, required:[true, 'Please supply body']},
  startDate:{type:Number, require:[true, 'Please choose a start date']},
  endDate:{type:Number},
  location:{type:String},
  eventStatus:{type:String}
});



EventsSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = slug(this.title);
    next();
  };
  next();
});





Event = module.exports = mongoose.model('Event', EventsSchema);

