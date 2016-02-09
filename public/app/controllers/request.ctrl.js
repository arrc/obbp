(function() {
  'use strict';
	var RequestCtrl = function($http, User, Request){
		var _this = this;
    _this.states = ["Alaska", "Alabama", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia", "Puerto Rico", "Guam", "American Samoa", "U.S. Virgin Islands", "Northern Mariana Islands"];


    _this.makeRequest = function(){
      Request.makeRequest(_this.requestForm).then(function(data){
        _this.results = data;
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('RequestCtrl',[
		'$http',
    'User',
    'Request',
		RequestCtrl
	]);
})();
