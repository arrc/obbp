(function() {
  'use strict';
	var RequestCtrl = function($http, State, User, Request){
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
    'State',
    'User',
    'Request',
		RequestCtrl
	]);
})();
