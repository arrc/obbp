var mongoose = require('mongoose');

var DbSchema = mongoose.Schema({
  name: String,
  message: String
});

module.exports = mongoose.model('DB', DbSchema);
