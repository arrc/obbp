(function(){
	'use strict';

	var Admin = function($http, $q){
    var o = {};

		// make a blood request
		o.makeAdmin = function(messageFormData){
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

		// make a blood request
		o.retriveUsers = function(){
			var dfd = $q.defer();
			$http.get('/api/admin/users')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// make a blood request
		o.updateUser = function(user){
			var dfd = $q.defer();
			$http.put('/api/admin/users/' + user._id, user)
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
