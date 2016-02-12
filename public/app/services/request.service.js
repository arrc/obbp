(function(){
	'use strict';

	var Request = function($http, $q){
    var o = {};

		// make a blood request
		o.makeRequest = function(requestFormData){
			console.log(requestFormData);
			var dfd = $q.defer();
			$http.post('/api/requests', requestFormData)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive a blood request
		o.retriveRequests = function(){
			var dfd = $q.defer();
			$http.get('/api/admin/requests')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive a single blood request
		o.retriveRequest = function(requestId){
			var dfd = $q.defer();
			$http.get('/api/admin/requests/' + requestId)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// update blood request
		o.updateRequest = function(request){
			var dfd = $q.defer();
			$http.put('/api/admin/requests/' + request._id, request)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive a single blood request
		o.deleteRequest = function(requestId){
			var dfd = $q.defer();
			$http.delete('/api/admin/requests/' + requestId)
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
