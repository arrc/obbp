'use strict';

angular.module('obbp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('search', {
    url: '/search',
    templateUrl: 'app/views/search/search.html'
  });
}]);
