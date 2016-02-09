(function(){
	'use strict';

	var Admin = function($http, $q){
    var o = {};

		// make a blood request
		o.makeAdmin = function(messageFormData){
console.log(messageFormData);
			var dfd = $q.defer();
			$http.post('/api/message', messageFormData)
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
	angular.module('obbp').factory('Admin',[
    '$http',
		'$q',
		Admin
	]);
})();
