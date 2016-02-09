'use strict';

module.exports = function(app){
	var core = require('./controllers/core.controller.js');
	var user = require('./controllers/user.controller.js');
	var request = require('./controllers/request.controller.js');

	// 'CORE' ----------------------------
	app.route('/').get(core.index);
  app.route('/initdb').get(core.initdb);

	// 'USER'
	app.route('/login').post(user.login);
	app.route('/signup').post(user.signup);
	app.route('/api/profile').get(user.profile);
	app.route('/users').get(user.users);
	app.route('/search').get(user.search);

	// 'REQUEST'
	app.route('/make-request').post(request.makeRequest);
};
