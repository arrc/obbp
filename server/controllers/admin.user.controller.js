'use strict';

let User = require('../models/user.model.js'),
  config = require('../config'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  _ = require('lodash');


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
