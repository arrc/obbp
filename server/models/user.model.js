'use strict';
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');

let UserSchema =  mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  mobile: Number,
  address: String,
  pincode: Number,
  state: String,
  dateOfBirth: Date,
  gender: String,
  weight: Number,
  bloodGroup: String
});

UserSchema.methods.authenticate = function(passwordToMatch) {
  return passwordToMatch === this.password;
};

// Generating Hash
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// password check
UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.options.toJSON = {
  transform: function(doc, ret, options){
    ret.id = ret._id;
    delete ret.password;
    return ret;
  }
};

module.exports = mongoose.model('User', UserSchema);
