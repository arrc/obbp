'use strict';

module.exports = function(app){
	var core = require('./controllers/core.controller.js');
	var user = require('./controllers/user.controller.js');
	var request = require('./controllers/request.controller.js');
	var message = require('./controllers/message.controller.js');
	var adminUser = require('./controllers/admin.user.controller.js');
	var adminRequest = require('./controllers/admin.request.controller.js');

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
	app.route('/api/requests').post(request.makeRequest);
	app.route('/api/requests/:requestId').get(adminRequest.retriveRequest);

	// 'MESSAGE'
	app.route('/api/message').post(message.createMessage);

	// 'ADMIN USER'

	// 'ADMIN REQUEST'
	app.route('/requests').get(adminRequest.retriveRequests);
	app.route('/requests/:requestId').get(adminRequest.retriveRequest);
	app.route('/requests/:requestId').put(adminRequest.updateRequest);
	app.route('/requests/:requestId').delete(adminRequest.deletRequest);
	app.param('requestId', adminRequest.requestById);
};
