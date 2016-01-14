'use strict';

angular.module('obbp').config(['$stateProvider', function($stateProvider){
  $stateProvider.state('login-register', {
    url: '/login-register',
    templateUrl: 'app/views/user/login-register.html'
  });
}]);
