'use strict';

let User = require('../models/user.model.js'),
  Camp = require('../models/camp.model.js'),
  _ = require('lodash'),
  moment = require('moment');

// // All camps
// exports.retriveCamps = function(req, res){
//   Camp.find({'state': req.user.state }).populate('expectedDonors actualDonors').exec(function(err, camps){
//     if (err || !camps) {
//       return res.status(400).json({message: 'Error finding camps.'});
//     } else {
//       return res.status(200).json({ data: camps, message: 'success'});
//     }
//   });
// };

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

// campById
exports.campById = function(req, res, next, campId){
  Camp.findById(campId).populate('expectedDonors').exec(function(err, doc){
    if (err) return next(err);
		if (!doc) return next(new Error('Failed to load camp ' + campId));
		req.camp = doc;
		next();
  });
};
