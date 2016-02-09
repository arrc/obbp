'use strict';
var mongoose = require('mongoose');

let MessageSchema = mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  date: Date
});

module.exports = mongoose.model('Message', MessageSchema);
