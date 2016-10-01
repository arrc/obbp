'use strict';

let User     = require('../models/user.model.js'),
  config     = require('../config'),
  passport   = require('passport'),
  moment     = require('moment'),
  jwt        = require('jsonwebtoken'),
  colors     = require('colors'),
  _          = require('lodash'),
  cloudinary = require('cloudinary'),
  util       = require('util'),
  shortid    = require('shortid');

exports.login = function(req, res, next){
  passport.authenticate('local-login', function(err, user, info){
    if (err || !user) {
      res.status(400).json({message: "Failed to login. Please provide correct credentials."});
    } else {
      req.logIn(user, {session: false}, function(err){
        if (err) {
          console.log(err);
          res.status(400).json({message: "Failed to login. Please provide correct credentials."});
        } else {
          let payload = {
            '_id' : user.id,
            username: user.username,
            isAdmin: user.isAdmin
          };
          let now = moment();
          let expiryDate = moment(now).add(7,'d');
          var token = jwt.sign(payload, config.jwtSecretKey, { expiresIn:  "7d" });
          res.status(200).json({token: token, user: user});
        }
      });
    }
  })(req, res, next);
};

exports.signup = function(req, res, next){
  passport.authenticate('local-signup', function(err, user, info){
    if (err || !user) {
      res.status(400).json(info);
    } else {
      req.logIn(user, {session: false}, function(err){
        if (err) {
          res.status(400).json(err);
        } else {
          let payload = {
            '_id' : user.id,
            username: user.username,
            isAdmin: user.isAdmin
          };
          let now = moment();
          let expiryDate = moment(now).add(7,'d');
          var token = jwt.sign(payload, config.jwtSecretKey, { expiresIn:  "7d" });
          res.status(200).json({token: token, user: user, message: 'Signup successfull.'});
        }
      });
    }
  })(req, res, next);
};

exports.profile = function(req, res){
  User.findOne({'username': req.user.username}).exec(function(err, userDoc){
    if (err || !userDoc) {
      return res.status(400).json({message: 'Error finding user.'});
    } else {
      var userDocJson = userDoc.toJSON();
      var data = _.omit(userDocJson, 'password');
      res.status(200).json({ data: data, message: 'success'});
    }
  });
};

exports.profileUpdate = function(req, res){
  var b = req.body;
  var data = {
      firstName: b.firstName,
      lastName: b.lastName,
      email: b.email,
      mobile: b.mobile,
      address: b.address,
      pincode: b.pincode,
      state: b.state,
      dateOfBirth: b.dateOfBirth,
      weight: b.weight,
      bloodGroup: b.bloodGroup
  };

  User.findOne({'username': req.user.username}).select('-password').exec(function(err, userDoc){
    if (err || !userDoc){
      return res.status(400).json({message: 'Failed to load user'});
    } else {
      // _.chain(data).extend({hi: 'erer'}).omit('name').value();
      userDoc = _.extend(userDoc, data);
      userDoc.save(function(err, updatedDoc){
        if (err || !updatedDoc){
          return res.status(400).json({message: 'Failed to update user'});
        } else {
          var updatedDocJson = updatedDoc.toJSON();
          var data = _.omit(updatedDocJson, 'password');
          res.status(200).json({ data: data, message: 'success'});
        }
      });
    }
  });
};

exports.changePassword = function(req, res){
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;

  if(req.user) { console.log(req.user);
    if(oldPassword && newPassword) {
      User.findById(req.user._id, function(err, user){
        if(!err && user){
          if(user.validPassword(oldPassword)) {
            user.password = newPassword;

            user.save(function(err, userDoc, updated){
              if(!err && updated){
                let payload = {
                  '_id' : userDoc.id,
                  username: userDoc.username,
                  isAdmin: user.isAdmin
                };
                let now = moment();
                let expiryDate = moment(now).add(7,'d');
                var token = jwt.sign(payload, config.jwtSecretKey, { expiresIn:  "7d" });
                res.status(200).json({token: token, user: user, message: 'Password change successfull.'});
              } else {
                console.error('Error updating password', err);
                res.status(400).json({message: 'Error changing password. Please try again.'});
              }
            });
          } else {
            res.status(400).json({message: 'Your old password did not match.'});
          }
        } else {
          console.log(err);
          res.status(400).json({message: 'There is no user by this username.'});
        }
      });
    } else {
      res.status(400).json({message: 'Old or New password not set.'});
    }
  } else {
    res.status(400).json({message: 'User not logged in.'});
  }
};

exports.users = function(req, res){
  User.find({}).exec(function(err, usersDoc){
    if (err || !usersDoc) {
      return res.status(400).json({message: 'Error finding users.'});
    } else {
      var userDocJson = usersDoc.map(function(user){
        return user.toJSON();
      });
      res.status(200).json({ data: userDocJson, message: 'success'});
    }
  });
};

// Serach - bloodGroup, state, name
exports.search = function(req, res){
  var bloodGroup = req.query.bg;
  var state = req.query.state;
  console.log(req.query);

  if (typeof state === 'undefined'){
    User.find({'bloodGroup': bloodGroup}).exec(function(err, usersDoc){
      if (err || !usersDoc) {
        return res.status(400).json({message: 'Error finding users.'});
      } else {
        return res.status(200).json({ data: usersDoc, message: 'success'});
      }
    });
  } else {
    User.find({ $and: [{'bloodGroup': bloodGroup}, {'state': state }]}).exec(function(err, usersDoc){
      if (err || !usersDoc) {
        return res.status(400).json({message: 'Error finding users.'});
      } else {
        return res.status(200).json({ data: usersDoc, message: 'success'});
      }
    });
  }

};


// Profile image change
exports.profileImageChange = function(req, res){
  let customId = shortid.generate();
  let filePath = req.files.file.path;
  let publicId = "obbp/profiles/" + req.user.username + '-' + customId;

	cloudinary.config({
	  cloud_name: config.cloudinaryCloudName,
	  api_key: config.cloudinaryApiKey,
	  api_secret: config.cloudinaryApiSecret
	});

  // console.log("Files: \n", util.inspect(req.files , { depth: null }));

	cloudinary.uploader.upload(filePath, function(result) {
	  User.findById(req.user._id).exec(function(err, userDoc){
      if (!err && userDoc) {
        userDoc.profileImagePublicId = result.public_id;
        userDoc.profileImageUrl = result.secure_url;
        userDoc.save(function(err, savedDoc){ console.log(savedDoc); });
      }
    });
	}, { public_id: publicId});

	res.status(200).json({message: 'done'});
};
