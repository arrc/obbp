'use strict';
var mongoose = require('mongoose');

let MessageSchema = mongoose.Schema({
  sender: {type: String, ref: 'User'},
  receiver: String,
  message: String,
  created: {type: Date, default: Date.now}
});


MessageSchema.set('toJSON', {
   virtuals: true
});

module.exports = mongoose.model('Message', MessageSchema);
