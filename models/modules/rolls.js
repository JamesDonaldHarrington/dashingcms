var mongoose = require('mongoose'),
    // slug = require('slug'),
    // ub = App.require('/helpers/ub'),

RollsSchema = new mongoose.Schema({
  title: String,
  access: [String],
  created:  {type:Number, default: Date.now()}
});


 
module.exports = mongoose.model('Roll', RollsSchema);

