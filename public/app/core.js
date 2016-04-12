(function() {
  'use strict';
  var app = angular.module('obbp',['ui.router','PubSub','angular-cache', 'angular-jwt',
  'ngNotify', 'ngDialog', 'ngLodash', 'datePicker', 'angularFileUpload' , 'ngFileUpload']);
  app.constant("moment", moment);
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider' , function($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(false).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/core/home.html'
      });
  }]);
}());
