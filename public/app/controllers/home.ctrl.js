(function() {
  'use strict';
	var HomeCtrl = function($http){
		var _this = this;
    _this.test = 'hi all';
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('HomeCtrl',[
		'$http',
		HomeCtrl
	]);
})();
