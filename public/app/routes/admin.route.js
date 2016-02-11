'use strict';

angular.module('obbp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('admin', {
    url: '/admin',
    templateUrl: 'app/views/admin/dashboard.html',
    abstract: true
  })
  .state('admin.users', {
    url: '/users',
    templateUrl: 'app/views/admin/users/admin.users.html'
  })
  .state('admin.requests', {
    url: '/requests',
    templateUrl: 'app/views/admin/admin.requests.html'
  })
  .state('admin.stocks', {
    url: '/stocks',
    templateUrl: 'app/views/admin/admin.stocks.html'
  })
  .state('admin.camps', {
    url: '/camps',
    templateUrl: 'app/views/admin/admin.camps.html'
  });
}]);
