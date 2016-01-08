'use strict';

let User = require('../models/user.model.js'),
  config = require('../config'),
  passport = require('passport'),
  jwt = require('jsonwebtoken');

exports.login = function(req, res, next){
  passport.authenticate('local-login', function(err, user, info){
    if (err || !user) {
      res.status(400).json(info);
    } else {
      req.logIn(user, {session: false}, function(err){
        if (err) {
          res.status(400).json(err);
        } else {
          var token = jwt.sign(user, config.jwtSecretKey, { expiresIn:  60*60*5 });
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
          var token = jwt.sign(user, config.jwtSecretKey, { expiresIn:  60*60*5 });
          res.status(200).json({token: token, user: user});
        }
      });
    }
  })(req, res, next);
};

exports.me = function(req, res){
  console.log(req.user.username);
};
