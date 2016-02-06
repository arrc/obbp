(function(){
	'use strict';

	var Search = function($http, $q){
    var o = {};

		// search
		o.search = function(searchData){
			var queryString = "?bg=" + encodeURIComponent(searchData.bg);
			if (searchData.state) {
				queryString += "&state=" + encodeURIComponent(searchData.state);
			}
			console.log(queryString);
			var dfd = $q.defer();
			$http.get('/search' + queryString)
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
	angular.module('obbp').factory('Search',[
    '$http',
		'$q',
		Search
	]);
})();
