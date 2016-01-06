'use strict';

module.exports = function(app){
	var core = require('./controllers/core.controller.js');

	// 'CORE' ----------------------------
	app.route('/').get(core.index);
	app.route('/api/test').get(core.test);
  app.route('/api/db').get(core.db);
};
