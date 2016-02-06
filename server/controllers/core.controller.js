'use strict';

let clientScripts = require('../config/client-scripts.js');
let User = require('../models/user.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();

exports.index = function(req, res, next) {
	res.render('index', {clientScripts : clientScripts});
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
					active: true
				 }
			];

			_.times(50, function(){
						var name = chance.first();
						var state = chance.state({ full: true });
						var street = chance.street();
						var address = `${street}, ${state}`;
						var bloodGroupChar = chance.character({pool: 'ABCDO'});
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
							active: chance.bool()
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
