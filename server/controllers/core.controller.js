'use strict';

let clientScripts = require('../config/client-scripts.js');
let DB = require('../models/db.model.js');

exports.index = function(req, res, next) {
	res.render('index', {clientScripts : clientScripts});
};

exports.test = function(req, res){
	res.json({ message: 'its working.'});
};

exports.db = function(req, res){
	DB.find({}, function(err, docs){
		res.json({data: docs});
	});
};
