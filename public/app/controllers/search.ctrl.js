(function() {
  'use strict';
	var SearchCtrl = function($http, Auth, ngNotify, ngDialog, State, User, Search){
		var _this = this;
    _this.user = {};
    _this.states = State.state();
    _this.results = [];
    _this.resultsCount = '';
    _this.loading = false;

    _this.search = function(){
      _this.loading = true;
      Search.search(_this.searchForm).then(function(data){
        _this.results = data;
        _this.resultsCount = _this.results.length;
        console.log(_this.results.length, _this.resultsCount);
        _this.loading = false;
      });
    };

    _this.dialog = function(user){
      if (!Auth.isAuthenticated()) {
        ngNotify.set('You must be logged in for sending message to the users.');
        return
      }
      ngDialog.open({
        template: 'app/views/message/message-dialog.html',
        controller: ['$scope', 'lodash', 'Message', function($scope, lodash, Message){
          $scope.userId = user._id;
          $scope.fullName = user.fullName;
          $scope.sendMessage = function(){
            var messageData = lodash.extend($scope.messageData, {receiver: $scope.userId});
            Message.sendMessage(messageData).then(function(data){
              console.log("Message sent");
              $scope.closeThisDialog();
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
    'Auth',
    'ngNotify',
    'ngDialog',
    'State',
    'User',
    'Search',
		SearchCtrl
	]);
})();
