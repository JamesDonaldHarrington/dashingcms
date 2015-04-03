var mongoose = require('mongoose'),
    // ub = App.require('/helpers/ub'),
    slug = require('slug'),

EventsSchema = new mongoose.Schema({
  created:     {type:Number, default: Date.now()},
  title:       {type:String, required:[true, 'Please supply a title']},
  image:       String,
  slug:        String,
  category:    [{type:String}],
  body:{type:  String, required:[true, 'Please supply body']},
  startDate:   {type:Number, require:[true, 'Please choose a start date']},
  endDate:     {type:Number, default:0},
  address:     String,
  city:        String,
  state:       String,
  zip:         String,
  eventStatus: String
});



EventsSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = slug(this.title);
    next();
  }
  next();
});





module.exports = mongoose.model('Event', EventsSchema);

