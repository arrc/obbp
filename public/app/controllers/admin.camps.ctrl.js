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
          $scope.minDate = moment.tz('UTC').add(-4, 'd').hour(12).startOf('h');
          console.log("Min date", $scope.minDate);
          $scope.createCamp = function(){
            console.log($scope.campFormData);
            // Camp.createCamp($scope.campFormData).then(function(data){
            //   console.log(data);
            // }, function(error){
            //   console.error(error);
            // });
          };
        }]
      });
    };

// retrive camps
    _this.retriveCamps = function(){
      Camp.retriveCamps().then(function(data){
        _this.camps = data;
      });
    };

// retrive camp
    _this.retriveCamp = function(messageId){
      Camp.retriveCamp(messageId).then(function(data){
        _this.camp = data;
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
