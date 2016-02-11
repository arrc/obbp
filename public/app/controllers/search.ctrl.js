(function() {
  'use strict';
	var SearchCtrl = function($http, ngDialog, User, Search){
		var _this = this;
    _this.user = {};
    _this.test = "this a search page.";
    _this.states = ["Alaska", "Alabama", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia", "Puerto Rico", "Guam", "American Samoa", "U.S. Virgin Islands", "Northern Mariana Islands"];
    _this.results = [];

    _this.search = function(){
      Search.search(_this.searchForm).then(function(data){
        _this.results = data;
      });
    };

    _this.dialog = function(user){
      ngDialog.open({
        template: 'app/views/message/message-dialog.html',
        controller: ['$scope', 'lodash', 'Message', function($scope, lodash, Message){
          $scope.userId = user._id;
          $scope.fullName = user.fullName;
          $scope.sendMessage = function(){
            var messageData = lodash.extend($scope.messageData, {receiver: $scope.userId});
            Message.sendMessage(messageData).then(function(data){
              console.log("Message sent");
            });
          };
        }]
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('SearchCtrl',[
		'$http',
    'ngDialog',
    'User',
    'Search',
		SearchCtrl
	]);
})();
