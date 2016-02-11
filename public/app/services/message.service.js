(function(){
	'use strict';

	var Message = function($http, $q){
    var o = {};

		// make a blood request
		o.sendMessage = function(messageFormData){
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

		// retrive messages
		o.retriveMessages = function(){
			var dfd = $q.defer();
			$http.get('/api/messages')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive single message
		o.retriveMessage = function(messageId){
			var dfd = $q.defer();
			$http.get('/api/message/' + messageId)
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
