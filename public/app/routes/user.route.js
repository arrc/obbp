'use strict';

angular.module('obbp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('login-register', {
    url: '/login-register',
    templateUrl: 'app/views/user/login-register.html'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'app/views/user/profile.html'
  });
}]);
