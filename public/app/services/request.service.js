(function(){
	'use strict';

	var Request = function($http, $q){
    var o = {};

		// make a blood request
		o.makeRequest = function(requestFormData){
console.log(requestFormData);
			var dfd = $q.defer();
			$http.post('/make-request', requestFormData)
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
	angular.module('obbp').factory('Request',[
    '$http',
		'$q',
		Request
	]);
})();
