'use strict';
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');

let UserSchema =  mongoose.Schema({
  username: String,
  password: String
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

module.exports = mongoose.model('User', UserSchema);
