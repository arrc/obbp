'use strict';

let User = require('../models/user.model.js'),
  Camp   = require('../models/camp.model.js'),
  _      = require('lodash'),
  moment = require('moment');


// All camps
exports.retriveCamps = function(req, res){
  Camp.find({}).exec(function(err, camps){
    if (err || !camps) {
      return res.status(400).json({message: 'Error finding camps.'});
    } else if (camps.length === 0) {
      return res.status(200).json({ message: 'There are no upcoming camps at the moment.' });
    } else {
      return res.status(200).json({ data: camps, message: 'success'});
    }
  });
};

// All local camps
exports.retriveLocalCamps = function(req, res){
  User.findOne({'username': req.user.username}).exec(function(err, userDoc){
    Camp.find({'state': userDoc.state }).exec(function(err, camps){
      if (err || !camps) {
        return res.status(400).json({message: 'Error finding camps.'});
      } else {
        return res.status(200).json({ data: camps, message: 'success'});
      }
    });
  })
};
