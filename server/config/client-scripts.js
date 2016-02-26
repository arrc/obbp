'use strict';

module.exports = [
  'app/core.js',
  // services
  'app/services/auth.service.js',
  'app/services/auth.interceptor.js',
  'app/services/user.service.js',
  'app/services/search.service.js',
  'app/services/request.service.js',
  'app/services/message.service.js',
  'app/services/admin.service.js',
  'app/services/camp.service.js',
  'app/services/states.service.js',
  // controllers
  'app/controllers/home.ctrl.js',
  'app/controllers/user.ctrl.js',
  'app/controllers/search.ctrl.js',
  'app/controllers/request.ctrl.js',
  'app/controllers/message.ctrl.js',
  'app/controllers/admin.ctrl.js',
  'app/controllers/admin.requests.ctrl.js',
  'app/controllers/admin.users.ctrl.js',
  'app/controllers/admin.camps.ctrl.js',
  // routes
  'app/routes/user.route.js',
  'app/routes/search.route.js',
  'app/routes/request.route.js',
  'app/routes/message.route.js',
  'app/routes/admin.route.js'
];
