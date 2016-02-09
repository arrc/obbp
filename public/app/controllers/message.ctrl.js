(function() {
  'use strict';
	var MessageCtrl = function($http, User, Message){
		var _this = this;

    _this.makeRequest = function(){
      Message.makeRequest(_this.requestForm).then(function(data){
        _this.results = data;
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('MessageCtrl',[
		'$http',
    'User',
    'Message',
		MessageCtrl
	]);
})();
