'use strict';

angular.module('obbp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('login-register', {
    url: '/login-register',
    templateUrl: 'app/views/user/login-register.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'app/views/user/register.html'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'app/views/user/profile.html'
  })
  .state('profile-edit', {
    url: '/profile/edit',
    templateUrl: 'app/views/user/profile-edit-form.html'
  })
  .state('password', {
  	abstract: true,
  	url: '/password',
  	template: '<ui-view/>'
  })
  .state('password.forgot', {
    url: '/forgot',
    templateUrl: 'app/views/user/forgot-password.html'
  })
  .state('password.reset', {
		abstract: true,
		url: '/reset',
		template: '<ui-view/>'
	})
  .state('password.reset.invalid', {
    url: '/invalid',
    templateUrl: 'app/views/user/invalid-password-reset-token.html'
  })
  .state('password.reset.form', {
    url: '/:token',
    templateUrl: 'app/views/user/password-reset.html'
  });
}]);
