(function() {
  'use strict';
	var AdminCtrl = function($http, User){
		var _this = this;
    _this.test = "this is a test message";
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('AdminCtrl',[
		'$http',
    'User',
		AdminCtrl
	]);
})();
