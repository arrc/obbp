'use strict';
var mongoose = require('mongoose');

let RequestSchema = mongoose.Schema({
  bloodGroup: String,
  state: String,
  hospital: String,
  purpose: String,
  message: String,
  user: {type: String, ref: 'User'},
  status: {type: String, enum: ['approved', 'pending', 'rejected', 'processing'], default: 'pending'},
  remarks: String,
  created: { type: Date, default: Date.now },
  updated: Date
});

module.exports = mongoose.model('Request', RequestSchema);
