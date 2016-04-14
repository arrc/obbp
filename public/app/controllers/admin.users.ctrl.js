(function() {
  'use strict';
	var AdminUsersCtrl = function($http, ngNotify, ngDialog, NgTableParams, User, Admin){
		var _this = this;
    _this.test = "this is a test message from AdminUsersCtrl";

    _this.retriveUsers = function(){
      Admin.retriveUsers().then(function(data){
        _this.users = data;
        _this.tableParams = new NgTableParams({}, {dataset: data});
      }, function(err){
        ngNotify.set(err.message, "error");
      });
    };

    _this.retriveUser = function(user){
      ngDialog.open({
        template: 'app/views/user/user-dialog.html',
        controller: ['$scope', 'lodash', 'User', function($scope, lodash, User){
          $scope.user = user;
          $scope.updateUser = function(){
            console.log($scope.user);
            Admin.updateUser($scope.user).then(function(data){
              console.log(data);
            });
          };
        }]
      });
    };

    _this.sendMessage = function(user){
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
	angular.module('obbp').controller('AdminUsersCtrl',[
		'$http',
    'ngNotify',
    'ngDialog',
    'NgTableParams',
    'User',
    'Admin',
		AdminUsersCtrl
	]);
})();
