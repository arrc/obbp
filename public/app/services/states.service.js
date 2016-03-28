(function(){
	'use strict';

	var State = function($http, $q){
    var o = {};

		// state
		o.state = function(){
			var state = [ "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
			"Chhattisgarh", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu",
			"Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
			"Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
			"Meghalaya", "Mizoram", "Nagaland", "Orissa", "Punjab", "Pondicherry", "Rajasthan",
			"Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
			];
			return state;
		};

    return o;
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').factory('State',[
    '$http',
		'$q',
		State
	]);
})();
