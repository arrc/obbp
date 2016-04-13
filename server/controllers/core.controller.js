'use strict';

let clientScripts = require('../config/client-scripts.js'),
fs                = require('fs'),
states            = require('../config/states.js'),
config            = require('../config'),
User              = require('../models/user.model.js'),
DB                = require('../models/db.model.js'),
_                 = require('lodash'),
chance            = require('chance').Chance(),
jwt               = require('jsonwebtoken'),
moment            = require('moment'),
util              = require('util'),
cloudinary = require('cloudinary');


exports.index = function(req, res, next) {
	res.render('index', {clientScripts : clientScripts});
};

exports.token = function(req, res){
	let payload = {
		'_id' : 'req.user._id',
		username: 'req.user.username',
		isAdmin: 'req.user.isAdmin'
	};

	var token = jwt.sign(payload, config.jwtSecretKey, { expiresIn:  "7d" });
	res.status(200).json({token: token});
};

exports.upload = function(req, res){
	let filePath = req.files.file.path;
	cloudinary.config({
	  cloud_name: 'arrc',
	  api_key: '614793835855469',
	  api_secret: 'Km1v5oSmgyW7f4RDgZW4I6_DsVo'
	});
	console.log("Files: \n", util.inspect(req.files , { depth: null }));
	console.log(filePath);
	cloudinary.uploader.upload(filePath, function(result) {
	  console.log(result);
	});
	res.status(200).json({message: 'done'});
};

exports.saveDate = function(req, res){
	var b = req.body;
	console.log(b);
	var datetime = moment(b.date + " " + b.time, "DD/MM/YYYY hh:mm:a").toISOString();
	var data = {
		date: moment(b.date, "DD/MM/YYYY").toISOString(),
		time: moment(b.time, "hh:mm").toISOString(),
		datetime: datetime
	};
	console.log('Data: \t',data);
	DB.create(data, function(err, doc){
		if (err) {
			return res.status(400).json({message: 'err ' + err});
		} else {
			console.log("DOC \t", moment(doc.datetime).format("DD/MM/YYYY hh:mm:a"));
			return res.status(200).json({data: doc, message: 'saved doc'});
		}
	});
};
