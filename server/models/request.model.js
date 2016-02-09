'use strict';
var mongoose = require('mongoose');

let RequestSchema = mongoose.Schema({
  bloodGroup: String,
  location: String,
  hospital: String,
  purpose: String,
  message: String,
  user: String,
  status: String,
  remarks: String
});

module.exports = mongoose.model('Requset', RequestSchema);
