'use strict';

let DB = require('../models/db.model.js');

exports.index = function(req, res, next) {
	res.render('index');
};

exports.test = function(req, res){
	res.json({ message: 'its working.'});
};

exports.db = function(req, res){
	DB.create({name: 'naveen', message: 'hi all!'});
	DB.find({}, function(err, docs){
		res.json({data: docs});
	});
};
