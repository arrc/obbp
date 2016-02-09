'use strict';

angular.module('obbp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('create-message', {
    url: '/message/create',
    templateUrl: 'app/views/message/message-form.html'
  })
  .state('retrive-messages', {
    url: '/messages',
    templateUrl: 'app/views/message/messages.html'
  })
  .state('retrive-message', {
    url: '/message',
    templateUrl: 'app/views/message/message.html'
  });
}]);
