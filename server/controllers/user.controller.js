'use strict';

let User = require('../models/user.model.js'),
  config = require('../config'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  _ = require('lodash');

exports.login = function(req, res, next){
  passport.authenticate('local-login', function(err, user, info){
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
          // var token = jwt.sign(payload, config.jwtSecretKey, { expiresIn:  60*60*5 });
          var token = jwt.sign(payload, config.jwtSecretKey);
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
            username: user.username
          };
          var token = jwt.sign(payload, config.jwtSecretKey, { expiresIn:  60*60*5 });
          res.status(200).json({token: token, user: user});
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
