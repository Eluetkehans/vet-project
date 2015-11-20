var mongoose = require('mongoose');

var petSchema = mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true}, // dog or cat
  size: {type: String, required: true}, // small, medium, large
  gender: {type: String, required: true}, // male or female
  color: {type: String, required: true} // yellow, brown, etc.
});

module.exports = mongoose.model('Pet', petSchema);