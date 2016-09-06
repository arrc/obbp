(function() {
  'use strict';
	var RequestCtrl = function($http, $state, Auth, State, User, Request, ngNotify){

    if (!Auth.isAuthenticated()) {
      ngNotify.set('You must login before requesting blood!');
      $state.go("login-register");
    }

		var _this = this;
    _this.states = State.state();


    _this.makeRequest = function(){
      Request.makeRequest(_this.requestForm).then(function(data){
        _this.results = data;
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('RequestCtrl',[
		'$http',
    '$state',
    'Auth',
    'State',
    'User',
    'Request',
    'ngNotify',
		RequestCtrl
	]);
})();
