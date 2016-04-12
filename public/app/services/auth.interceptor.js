(function(){
	'use strict';

	angular.module('obbp').factory('AuthInterceptor', function ($rootScope, $q, $window, Auth) {
	  return {
		request: function (config) {
			var token = Auth.getToken();
			if (token) {
				config.headers = config.headers || {};
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		},
		response: function(response) {
        var receivedToken = response.headers('Authorization');
        if(receivedToken) {
					console.log("receivedToken \n",receivedToken);
					Auth.clearToken();
					Auth.setToken(receivedToken.split(' ')[1]);
        }
        return response;
    },
		responseError: function (rejection) {
		  if (rejection.status === 401) {
			// handle the case where the user is not authenticated
			console.warn('user not authenticated', rejection);
      ngNotify.set('user not authenticated ! ' + rejection, 'error');
		  }
		  return $q.reject(rejection);
		}
	  };
	});

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').config(['$httpProvider',
		function($httpProvider) {
			$httpProvider.interceptors.push('AuthInterceptor');
		}
	]);
})();
