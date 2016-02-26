'use strict';

let clientScripts = require('../config/client-scripts.js');
let User = require('../models/user.model.js');
let DB = require('../models/db.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();
let moment = require('moment');

exports.index = function(req, res, next) {
	res.render('index', {clientScripts : clientScripts});
};

exports.testPost = function(req, res){
	console.log(req.body);
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

exports.initdb = function(req, res){
	User.find({}, function(err, docs){
		if(docs.length === 0) {
			var usersArray = [
				{username: 'admin',
					email: 'admin@dfasf.com',
					password: 'admin',
					firstName: 'naveen',
					lastName: 'kumar',
					mobile: 95345342342,
					address: '23-rew, rwo4234, delhi',
					state: 'delhi',
					pincode: '231211',
					dateOfBirth: '21-11-1988',
					gender: 'male',
					bloodGroup: 'A+',
					weight: 23,
					isActive: true,
					isAdmin: true
				 }
			];

			_.times(50, function(){
						var name = chance.first();
						var state = chance.state({ full: true });
						var street = chance.street();
						var address = `${street}, ${state}`;
						var bloodGroupChar = chance.character({pool: 'ABO'});
						var bloodGroupPlusMinus = chance.character({pool: '-+'});
						var bloodGroupFull = (`${bloodGroupChar}${bloodGroupPlusMinus}`);
						usersArray.push({
							username: name.toLowerCase(),
							email: chance.email(),
							firstName: name,
							lastName: chance.last(),
							password: 'admin',
							mobile: chance.phone({ country: "uk", mobile: true }),
							address: address,
							state: state,
							pincode: chance.zip(),
							dateOfBirth: chance.birthday({string: true, american: false}),
							gender: chance.gender(),
							bloodGroup: bloodGroupFull,
							weight: chance.integer({min: 50, max: 180}),
							isActive: chance.bool(),
							isAdmin: false
					});
				});

				User.create(usersArray, function(err, docs){
					if (err) {
						res.status(400).json({message: err});
					} else {
						res.status(200).jsonp({message: 'Users successfully created.', data: docs});
					}
				});
		}
	});
};
