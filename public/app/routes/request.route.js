'use strict';

angular.module('obbp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('make-request', {
    url: '/request-blood',
    templateUrl: 'app/views/request/request-form.html'
  });
}]);
