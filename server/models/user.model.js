'use strict';
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  crypto = require('crypto');

let UserSchema =  mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  address: String,
  pincode: Number,
  state: String,
  dateOfBirth: String,
  gender: String,
  weight: Number,
  bloodGroup: String,
  active: Boolean
});

/**
* Hook a pre save method to hash the password
*/
UserSchema.pre('save', function(next) {
  this.wasNew = this.isNew;
  if(this.isNew){
    if (this.password) {
      this.password = this.generateHash(this.password);
    }
    next();
  } else {
    next();
  }
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
