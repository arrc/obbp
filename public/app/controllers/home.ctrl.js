(function() {
  'use strict';
	var HomeCtrl = function($http, $state, $window, State, User, Auth, ngNotify){
		var _this = this;
    _this.states = State.state();
    _this.isAuth = Auth.isAuthenticated();
    _this.isAdmin = Auth.user().isAdmin;
    // console.log('isAdmin', _this.isAdmin);

    // login
    _this.login = function(){
      User.login(_this.credentials).then(function(){
				_this.isAuth = Auth.isAuthenticated();
        $window.location.reload();
        // $state.go('profile', {reload: true});
				ngNotify.set('User logged in successfully!');
			}, function(error){
				ngNotify.set('user not authenticated ! ' + error, 'error');
			});
    };

    // signup
    _this.signup = function(){
      User.signup(_this.registrationData).then(function(){
        ngNotify.set('Account created successfully!');
        $state.go('profile');
      });
    };

    // logout
    _this.logout = function(){
			User.logout().then(function(){
				_this.isAuth = Auth.isAuthenticated();
				$window.location.reload();
			});
		};
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('HomeCtrl',[
		'$http',
    '$state',
    '$window',
    'State',
    'User',
    'Auth',
    'ngNotify',
		HomeCtrl
	]);
})();
