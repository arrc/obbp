(function(){
	'use strict';

	var Camp = function($http, $q){
    var o = {};

		// create camp
		o.createCamp = function(campFormData){
			var dfd = $q.defer();
			$http.post('/api/camps', campFormData)
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
			$http.get('/api/camps/' + campId)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// delete camp
		o.deleteMessage = function(campId){
			var dfd = $q.defer();
			$http.delete('/api/camps/' + campId)
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
