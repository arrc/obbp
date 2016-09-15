'use strict';

let User = require('../models/user.model.js'),
  Request = require('../models/request.model.js'),
  _ = require('lodash');

// Single request
exports.retriveRequest = function(req, res){
  return res.status(200).json({ data: req.request, message: 'success'});
};

// All request
exports.retriveRequests = function(req, res){
  Request.find({}).sort({created: -1}).populate('user').exec(function(err, docs){
    if (err || !docs) {
      return res.status(400).json({message: 'Error finding docs.'});
    } else {
      return res.status(200).json({ data: docs, message: 'success'});
    }
  });
};

// Update request
exports.updateRequest = function(req, res){
  var request = req.request;
  request = _.extend(request, req.body);
  request.save(function(err, doc){
    if (err || !doc) {
      return res.status(400).json({message: 'Error finding doc.'});
    } else {
      return res.status(200).json({ data: doc, message: 'success'});
    }
  });
};

// Delete request
exports.deletRequest = function(req, res){
  var request = req.request;
  request.remove(function(err){
    if (err) {
      return res.status(400).json({message: 'Error deleting doc.'});
    } else {
      return res.status(200).json({ message: 'successfully deleted'});
    }
  });
};

exports.requestById = function(req, res, next, requestId){
  Request.findById(requestId).populate('user').exec(function(err, doc){
    if (err) return next(err);
		if (!doc) return next(new Error('Failed to load request ' + requestId));
		req.request = doc;
		next();
  });
};
