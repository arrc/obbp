'use strict';

let User = require('../models/user.model.js'),
  Camp = require('../models/camp.model.js'),
  _ = require('lodash'),
  moment = require('moment');

// 1- create camps (maps)
// state, address, date, googleMapUrl, description
exports.createCamp = function(req, res){
  var b = req.body;
  var datetime = moment(b.date + " " + b.time, "DD/MM/YYYY hh:mm:a").toISOString();
  var data = {
    state: b.state,
    address: b.address,
    googleMapUrl: b.googleMapUrl,
    description: b.description,
    datetime: datetime
  };

  Camp.create(data, function(err, camp){
    if (err || !camp) {
      return res.status(400).json({message: 'Error finding camp.'});
    } else {
      console.log(camp);
      return res.status(200).json({ data: camp, message: 'success'});
    }
  });
};

// update camp
exports.updateCamp = function(req, res){
  var b = req.body;
  var datetime = moment(b.date + " " + b.time, "DD/MM/YYYY hh:mm:a").toISOString();
  var data = {
    state: b.state,
    address: b.address,
    googleMapUrl: b.googleMapUrl,
    description: b.description,
    datetime: datetime
  };
  var camp = req.camp;
  camp = _.extend(camp, data);
  camp.save(function(err, doc){
    if (err || !doc) {
      return res.status(400).json({message: 'Error finding doc.'});
    } else {
      return res.status(200).json({ data: doc, message: 'success'});
    }
  });
};

// Single camp
exports.retriveCamp = function(req, res){
  return res.status(200).json({ data: req.camp, message: 'success'});
};

// All camps
exports.retriveCamps = function(req, res){
  Camp.find({}).exec(function(err, camps){
    if (err || !camps) {
      return res.status(400).json({message: 'Error finding camps.'});
    } else {
      return res.status(200).json({ data: camps, message: 'success'});
    }
  });
};

// Delete camp
exports.deletCamp = function(req, res){
  var camp = req.camp;
  camp.remove(function(err){
    if (err) {
      return res.status(400).json({message: 'Error deleting camp.'});
    } else {
      return res.status(200).json({ message: 'successfully deleted camp'});
    }
  });
};

// campById
exports.campById = function(req, res, next, campId){
  Camp.findById(campId).exec(function(err, doc){
    if (err) return next(err);
		if (!doc) return next(new Error('Failed to load camp ' + campId));
		req.camp = doc;
		next();
  });
};
