'use strict';

module.exports = function(app){
	var core = require('./controllers/core.controller.js');
	var user = require('./controllers/user.controller.js');

	// 'CORE' ----------------------------
	app.route('/').get(core.index);
	app.route('/api/test').get(core.test);
  app.route('/api/db').get(core.db);

	// 'USER'
	app.route('/login').post(user.login);
	app.route('/signup').post(user.signup);
	app.route('/api/me').get(user.me);
};
