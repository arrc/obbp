'use strict';

module.exports = [
  'app/core.js',
  // services
  'app/services/auth.service.js',
  'app/services/auth.interceptor.js',
  'app/services/user.service.js',
  'app/services/search.service.js',
  // controllers
  'app/controllers/home.ctrl.js',
  'app/controllers/user.ctrl.js',
  'app/controllers/search.ctrl.js',
  // routes
  'app/routes/user.route.js',
  'app/routes/search.route.js'
];