'use strict';
var mongoose = require('mongoose');

let CampSchema = mongoose.Schema({
  state: String,
  googleMapUrl: String,
  address: String,
  description: String,
  datetime: Date,
  expectedDonors: [{type: String, ref: 'User'}],
  actualDonors: [{type: String, ref: 'User'}]
});

module.exports = mongoose.model('Camp', CampSchema);
