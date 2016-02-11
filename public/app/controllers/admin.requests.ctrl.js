(function() {
  'use strict';
	var AdminRequestsCtrl = function($http, Request){
		var _this = this;
    _this.test = "this is a test message from AdminRequestsCtrl";
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('AdminRequestsCtrl',[
		'$http',
    'Request',
		AdminRequestsCtrl
	]);
})();
