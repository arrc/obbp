'use strict';

let User = require('../models/user.model.js'),
  Message = require('../models/message.model.js'),
  _ = require('lodash');

// make message
exports.createMessage = function(req, res){
  var b = req.body;

  var data = {
    sender: req.user._id,
    receiver: b.receiver,
    message: b.message,
  };

  Message.create(data, function(err, message){
    if (err || !message) {
      return res.status(400).json({message: 'Error finding message.'});
    } else {
      console.log(message);
      return res.status(200).json({ data: message, message: 'success'});
    }
  });
};

// Single message
exports.retriveMessage = function(req, res){
  return res.status(200).json({ data: req.message, message: 'success'});
};

// All messages
exports.retriveMessages = function(req, res){
  Message.find({'receiver': req.user._id}).populate('sender').exec(function(err, messages){
    if (err || !messages) {
      return res.status(400).json({message: 'Error finding messages.'});
    } else {
      return res.status(200).json({ data: messages, message: 'success'});
    }
  });
};

// Delete message
exports.deletMessage = function(req, res){
  var message = req.message;
  message.remove(function(err){
    if (err) {
      return res.status(400).json({message: 'Error deleting message.'});
    } else {
      return res.status(200).json({ message: 'successfully deleted message'});
    }
  });
};

// messageById
exports.messageById = function(req, res, next, messageId){
  Message.findById(messageId).populate('user').exec(function(err, doc){
    if (err) return next(err);
		if (!doc) return next(new Error('Failed to load message ' + messageId));
		req.message = doc;
		next();
  });
};
