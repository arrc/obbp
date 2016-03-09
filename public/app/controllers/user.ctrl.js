(function() {
  'use strict';
	var UserCtrl = function($http, State, User){
		var _this = this;
  // State
    _this.state = State.state();
    _this.user = {};
    _this.profileData = {};

    User.profile().then(function(data){
      console.log(data);
      _this.user = data;
      _this.profileData = data;
    }, function(error){
      console.error(error);
    });

    _this.profileUpdate = function(){
      User.profileUpdate(_this.profileData).then(function(data){
        console.log('User updated data \t',data);
      }, function(error){
        console.error(error);
      });
    };

	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('UserCtrl',[
		'$http',
    'State',
    'User',
		UserCtrl
	]);
})();
