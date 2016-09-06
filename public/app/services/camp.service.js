(function(){
	'use strict';

	var Camp = function($http, $q){
    var o = {};

		// create camp
		o.createCamp = function(campFormData){
			var dfd = $q.defer();
			$http.post('/api/admin/camps', campFormData)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive camps
		o.retriveCamps = function(){
			var dfd = $q.defer();
			$http.get('/api/admin/camps')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive camps PUBLIC
		o.retrivePublicCamps = function(){
			var dfd = $q.defer();
			$http.get('/camps')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive camps LOCAL
		o.retriveLocalCamps = function(){
			var dfd = $q.defer();
			$http.get('/api/camps')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive single camp
		o.retriveCamp = function(campId){
			var dfd = $q.defer();
			$http.get('/api/admin/camps/' + campId)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// make a blood request
		o.updateCamp = function(camp){
			var dfd = $q.defer();
			$http.put('/api/admin/camps/' + camp._id, camp)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// delete camp
		o.deleteCamp = function(campId){
			var dfd = $q.defer();
			$http.delete('/api/admin/camps/' + campId)
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
	angular.module('obbp').factory('Camp',[
    '$http',
		'$q',
		Camp
	]);
})();
