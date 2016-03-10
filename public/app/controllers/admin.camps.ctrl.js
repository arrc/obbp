(function() {
  'use strict';
	var CampCtrl = function($http, ngDialog, ngNotify, State, User, Camp){
		var _this = this;
    _this.camps = []; // all camps
    _this.camp = {}; // single camp

// State
    _this.state = State.state();

// create camp
    _this.createCamp = function(){
      ngDialog.open({
        template: 'app/views/admin/camp/camp-form.html',
        controller: ['$scope', 'lodash', 'Camp', 'State', 'moment', function($scope, lodash, Camp, State, moment){
          $scope.states = State.state();
          $scope.createCamp = function(){
            console.log($scope.campFormData);
            Camp.createCamp($scope.campFormData).then(function(data){
              console.log(data);
            }, function(error){
              console.error(error);
            });
          };
        }]
      });
    };

// retrive camps
    _this.retriveCamps = function(){
      Camp.retriveCamps().then(function(data){
        _this.camps = data;
        console.log('Camps: \t', _this.camps);
      }, function(error){
        console.error(error);
      });
    };

// retrive camp and update camp
    _this.retriveCamp = function(camp){
      ngDialog.open({
        template: 'app/views/admin/camp/camp-edit-form.html',
        controller: ['$scope', 'lodash', 'Camp', 'State', 'moment', function($scope, lodash, Camp, State, moment){
          $scope.states = State.state();
          $scope.camp = angular.copy(camp);
          $scope.updateCamp = function(){
            Camp.updateCamp($scope.camp).then(function(data){
              console.log('updated camp',data);
            }, function(error){
              console.error(error);
            });
          };
        }]
      });
    };

// delete camp
    _this.deleteCamp = function(camp){
      var index = _this.camps.indexOf(camp);
      Camp.deleteCamp(camp._id).then(function(){
        _this.camps.splice(index, 1);
        ngNotify.set('Camp deleted successfully ', 'error');
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('CampCtrl',[
		'$http',
    'ngDialog',
    'ngNotify',
    'State',
    'User',
    'Camp',
		CampCtrl
	]);
})();