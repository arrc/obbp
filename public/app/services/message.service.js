(function(){
	'use strict';

	var Message = function($http, $q){
    var o = {};

		// make a blood request
		o.makeMessage = function(messageFormData){
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
	angular.module('obbp').factory('Message',[
    '$http',
		'$q',
		Message
	]);
})();
