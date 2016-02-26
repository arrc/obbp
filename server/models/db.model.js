var mongoose = require('mongoose');

var DbSchema = mongoose.Schema({
  name: String,
  message: String,
  date: Date,
  time: Date,
  datetime: Date
});

module.exports = mongoose.model('DB', DbSchema);
