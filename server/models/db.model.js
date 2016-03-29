var mongoose = require('mongoose');

// sandbox: created for tinkring with moment.js & iso datetime thingy.
var DbSchema = mongoose.Schema({
  name: String,
  message: String,
  date: Date,
  time: Date,
  datetime: Date
});

module.exports = mongoose.model('DB', DbSchema);
