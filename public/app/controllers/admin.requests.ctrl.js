(function() {
  'use strict';
	var AdminRequestsCtrl = function($http, ngDialog, Request){
		var _this = this;
    _this.test = "this is a test message from AdminRequestsCtrl";

    _this.retriveRequests = function(){
      Request.retriveRequests().then(function(data){
        _this.requests = data;
      });
    };

    _this.retriveRequest = function(request){
      ngDialog.open({
        template: 'app/views/request/request-dialog.html',
        controller: ['$scope', 'lodash', 'Request', function($scope, lodash, Request){
          $scope.request = request;
          $scope.sendMessage = function(){
            var messageData = lodash.extend($scope.messageData, {receiver: $scope.userId});
            Request.sendMessage(messageData).then(function(data){
              console.log("Message sent");
            });
          };
        }]
      });
    };

    _this.deleteRequest = function(request){
      var index = _this.requests.indexOf(request);
      Request.deleteRequest(request._id).then(function(){
        _this.requests.splice(index, 1);
        ngNotify.set('Request deleted successfully ', 'error');
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('AdminRequestsCtrl',[
		'$http',
    'ngDialog',
    'Request',
		AdminRequestsCtrl
	]);
})();
