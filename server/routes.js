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
	app.route('/api/message/:messageId').get(message.retriveMessage);
	app.route('/api/messages').get(message.retriveMessages);
	app.route('/api/message/:messageId').delete(message.deletMessage);
	app.param('messageId', message.messageById);

	// 'ADMIN USER'
	app.route('/api/admin/users').get(adminUser.retriveUsers);
	app.route('/api/admin/users/:userId').put(adminUser.updateUser);
	app.param('userId', adminUser.userById);

	// 'ADMIN REQUEST'
	app.route('/api/admin/requests').get(adminRequest.retriveRequests);
	app.route('/api/admin/requests/:requestId').get(adminRequest.retriveRequest);
	app.route('/api/admin/requests/:requestId').put(adminRequest.updateRequest);
	app.route('/api/admin/requests/:requestId').delete(adminRequest.deletRequest);
	app.param('requestId', adminRequest.requestById);
};
