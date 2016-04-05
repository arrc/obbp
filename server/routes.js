'use strict';

module.exports = function(app) {
  var core       = require('./controllers/core.controller.js'),
    user         = require('./controllers/user.controller.js'),
    camp         = require('./controllers/camp.controller.js'),
    request      = require('./controllers/request.controller.js'),
    message      = require('./controllers/message.controller.js'),
    adminUser    = require('./controllers/admin.user.controller.js'),
    adminRequest = require('./controllers/admin.request.controller.js'),
    adminCamp    = require('./controllers/admin.camp.controller.js');

  // 'CORE' ----------------------------
  app.route('/').get(core.index);
  app.route('/seed').get(core.seed);
  app.route('/test').post(core.testPost);
  app.route('/date').post(core.saveDate);

  // 'USER'
  app.route('/login').post(user.login);
  app.route('/signup').post(user.signup);
  app.route('/api/profile').get(user.profile);
  app.route('/api/profile').put(user.profileUpdate);
  app.route('/users').get(user.users);
  app.route('/search').get(user.search);

  // 'CAMPS'
  app.route('/api/camps').get(camp.retriveCamps);

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
