(function() {
  'use strict';
	var PasswordCtrl = function($http, $state, $window, $timeout, $stateParams, State, User, Auth, ngNotify, FileUploader, Upload){
		var _this = this;

    _this.changePassword = function(){
      User.changePassword($stateParams.token, _this.changePasswordData).then(function(data){
        console.log('Password changed successfully. \t',data);
        $state.go('login-register');
        ngNotify.set("Password changed successfully.", "success");
      }, function(error){
        console.error(error);
        ngNotify.set("Failed to change password.", "error");
      });
    };

    _this.forgotPassword = function(){
      User.forgotPassword(_this.forgotPasswordData).then(function(res){
        ngNotify.set(res.message, "success");
      }, function(error){
        ngNotify.set(error.message, "error");
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('PasswordCtrl',[
		'$http',
    '$state',
    '$window',
    '$timeout',
    '$stateParams',
    'State',
    'User',
    'Auth',
    'ngNotify',
    'FileUploader',
    'Upload',
		PasswordCtrl
	]);
})();
