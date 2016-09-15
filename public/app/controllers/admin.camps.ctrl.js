(function() {
  'use strict';
	var CampCtrl = function($http, ngDialog, ngNotify, State, User, Camp){
		var _this = this;
    _this.camps = []; // all camps
    _this.camp = {}; // single camp
    _this.loading = false;

    // _this.reload = _this.retriveCamps();

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
              $scope.closeThisDialog();
            }, function(error){
              console.error(error);
            });
          };
        }]
      });
    };

// retrive camps
    _this.retriveCamps = function(){
      _this.loading = true;
      Camp.retriveCamps().then(function(data){
        _this.loading = false;
        _this.camps = data;
        console.log('Camps: \t', _this.camps);
      }, function(error){
        console.error(error);
      });
    };

// retrive public camps
    _this.retrivePublicCamps = function(){
      Camp.retrivePublicCamps().then(function(data){
        _this.camps = data;
        console.log('Camps: \t', _this.camps);
      }, function(error){
        console.error(error);
      });
    };

// retrive camp and update camp
    _this.retriveCamp = function(camp){
      ngDialog.open({
        template: 'app/views/admin/camp/camp-modal.html',
        controller: ['$scope', function($scope){
          $scope.camp = camp;
        }]
      });
    };

// retrive camp and update camp
    _this.updateCampModal = function(camp){
      ngDialog.open({
        template: 'app/views/admin/camp/camp-edit-form.html',
        controller: ['$scope', 'lodash', 'Camp', 'State', 'moment', function($scope, lodash, Camp, State, moment){
          $scope.states = State.state();
          $scope.camp = angular.copy(camp);
          $scope.updateCamp = function(){
            Camp.updateCamp($scope.camp).then(function(data){
              console.log('updated camp',data);
              $scope.closeThisDialog();
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
