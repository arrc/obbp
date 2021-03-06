'use strict';

module.exports = function(app) {
  var core       = require('./controllers/core.controller.js'),
    user         = require('./controllers/user.controller.js'),
    password     = require('./controllers/users/user.password.controller.js'),
    camp         = require('./controllers/camp.controller.js'),
    request      = require('./controllers/request.controller.js'),
    message      = require('./controllers/message.controller.js'),
    adminUser    = require('./controllers/admin.user.controller.js'),
    adminRequest = require('./controllers/admin.request.controller.js'),
    adminCamp    = require('./controllers/admin.camp.controller.js');

  var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

  // 'CORE' ----------------------------
  app.route('/').get(core.index);
  app.route('/token').get(core.token);
  app.route('/date').post(core.saveDate);
  app.route('/upload').post(multipartMiddleware, core.upload);

  // 'AUTH'
  app.route('/auth/login').post(user.login);
  app.route('/auth/signup').post(user.signup);
  app.route('/auth/forgot').post(password.forgotPassword);
	app.route('/auth/reset/:token').get(password.verifyResetToken);
	app.route('/auth/reset/:token').post(password.resetPassword);

  // 'USER'
  app.route('/login').post(user.login);
  app.route('/signup').post(user.signup);
  app.route('/api/profile').get(user.profile);
  app.route('/api/profile').put(user.profileUpdate);
  app.route('/api/profile/image').post(multipartMiddleware, user.profileImageChange);
  app.route('/api/user/password').put(user.changePassword);
  app.route('/users').get(user.users);
  app.route('/search').get(user.search);

  // 'CAMPS'
  app.route('/camps').get(camp.retriveCamps);
  app.route('/api/camps').get(camp.retriveLocalCamps);

  // 'REQUEST'
  app.route('/api/requests').post(request.makeRequest);
  app.route('/api/requests/:requestId').get(adminRequest.retriveRequest);

  // 'MESSAGE'
  app.route('/api/message').post(message.createMessage); // pluralize
  app.route('/api/message/:messageId').get(message.retriveMessage);
  app.route('/api/messages').get(message.retriveMessages);
  app.route('/api/message/:messageId').delete(message.deletMessage);
  app.param('messageId', message.messageById);

  // 'ADMIN USER'
  app.use('/api/admin', adminUser.hasAuthorization);
  app.route('/api/admin/users').get(adminUser.retriveUsers);
  app.route('/api/admin/users/:userId').put(adminUser.updateUser);
  app.param('userId', adminUser.userById);

  // 'ADMIN REQUEST'
  app.route('/api/admin/requests').get(adminRequest.retriveRequests);
  app.route('/api/admin/requests/:requestId').get(adminRequest.retriveRequest);
  app.route('/api/admin/requests/:requestId').put(adminRequest.updateRequest);
  app.route('/api/admin/requests/:requestId').delete(adminRequest.deletRequest);
  app.param('requestId', adminRequest.requestById);

  // 'ADMIN CAMP'
  app.route('/api/admin/camps').post(adminCamp.createCamp);
  app.route('/api/admin/camps').get(adminCamp.retriveCamps);
  app.route('/api/admin/camps/:campById').get(adminCamp.retriveCamp);
  app.route('/api/admin/camps/:campById').put(adminCamp.updateCamp);
  app.route('/api/admin/camps/:campById').delete(adminCamp.deletCamp);
  app.param('campById', adminCamp.campById);
};
