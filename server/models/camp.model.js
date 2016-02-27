'use strict';
var mongoose = require('mongoose');
var moment = require('moment');

let CampSchema = mongoose.Schema({
  state: String,
  googleMapUrl: String,
  address: String,
  description: String,
  datetime: {type: Date},
  expectedDonors: [{type: String, ref: 'User'}],
  actualDonors: [{type: String, ref: 'User'}]
});

CampSchema.virtual('date').get(function(){
  return moment(this.datetime).format("DD/MM/YYYY");
});

CampSchema.virtual('time').get(function(){
  return moment(this.datetime).format("hh:mm:a");
});

CampSchema.set('toJSON', {
   virtuals: true
});

module.exports = mongoose.model('Camp', CampSchema);
