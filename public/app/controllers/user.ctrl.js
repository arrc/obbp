(function() {
  'use strict';
	var UserCtrl = function($http, $state, State, User, ngNotify){
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
        $state.go('profile');
        ngNotify.set("Profile update successfully", "success");
      }, function(error){
        console.error(error);
        ngNotify.set("Failed to update profile.", "error");
      });
    };

	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('UserCtrl',[
		'$http',
    '$state',
    'State',
    'User',
    'ngNotify',
		UserCtrl
	]);
})();
