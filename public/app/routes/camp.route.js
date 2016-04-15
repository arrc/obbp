'use strict';

angular.module('obbp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('camps', {
    url: '/camps',
    templateUrl: 'app/views/camp/camps.html'
  })
  .state('gallery', {
    url: '/gallery',
    templateUrl: 'app/views/camp/gallery.html'
  })
  .state('map', {
    url: '/map',
    templateUrl: 'app/views/camp/map.html'
  });
}]);
