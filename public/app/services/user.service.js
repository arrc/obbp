(function(){
	'use strict';

	var User = function($http, $q, $window, jwtHelper, Auth){
    var o = {};

    // login
    o.login = function(credentials){
      var dfd = $q.defer();
			$http.post('/login', credentials)
				.success(function(res){
					Auth.setToken(res.token);
					dfd.resolve(res);
				})
				.error(function(error){
					Auth.clearToken();
					dfd.reject(error);
				});
			return dfd.promise;
    };

    // signup
    o.signup = function(registrationData) {
			var dfd = $q.defer();
			$http.post('/signup', registrationData)
				.success(function(res){
					Auth.setToken(res.token);
					dfd.resolve(res);
				})
				.error(function(error){
					Auth.clearToken();
					dfd.reject(error);
				});
			return dfd.promise;
		};

    // logout
    o.logout = function(){
      var dfd = $q.defer();
			dfd.resolve(Auth.clearToken());
			return dfd.promise;
    };

		// profile
		o.profile = function(){
			var dfd = $q.defer();
			$http.get('/api/profile')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// profile
		o.profileUpdate = function(profileData){
			console.log(profileData);
			var dfd = $q.defer();
			$http.put('/api/profile',profileData)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// forgot password
		o.forgotPassword = function(forgotPasswordData){
			var dfd = $q.defer();
			$http.post('/auth/forgot',forgotPasswordData)
				.success(function(res){
					dfd.resolve(res);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// change password
		o.changePassword = function(token, changePasswordData){
			var dfd = $q.defer();
			$http.post('/auth/reset/' + token,changePasswordData)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

    return o;
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').factory('User',[
    '$http',
		'$q',
		'$window',
		'jwtHelper',
    'Auth',
		User
	]);
})();
