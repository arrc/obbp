'use strict';

let User = require('../models/user.model.js'),
  Request = require('../models/request.model.js'),
  _ = require('lodash');

// make request
exports.makeRequest = function(req, res){
  var b = req.body;
  
  var data = {
    bloodGroup: b.bg,
    state: b.state,
    hospital: b.hospital,
    purpose: b.purpose,
    message: b.message,
    user: req.user._id,
  };

  Request.create(data, function(err, doc){
    if (err || !doc) {
      return res.status(400).json({message: 'Error finding users.'});
    } else {
      return res.status(200).json({ data: doc, message: 'success'});
    }
  });
};
