'use strict';

angular.module('obbp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('dashboard', {
    url: '/admin/dashboard',
    templateUrl: 'app/views/admin/dashboard.html'
  });
}]);
