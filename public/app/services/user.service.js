(function(){
	'use strict';

	var User = function($http, $q, $window, jwtHelper, Auth){
    var o = {};

    // login
    o.login = function(credentials){
      var dfd = $q.defer();
			$http.post('/login', credentials)
				.success(function(res){
          console.log(res);
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
			console.log(registrationData);
			var dfd = $q.defer();
			$http.post('/signup', registrationData)
				.success(function(res){
          console.log(res);
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
