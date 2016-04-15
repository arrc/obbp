'use strict';

angular.module('obbp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('about-us', {
    url: '/about-us',
    templateUrl: 'app/views/misc/about-us.html'
  })
  .state('contact', {
    url: '/contact',
    templateUrl: 'app/views/misc/contact.html'
  })
  .state('faq', {
    url: '/faq',
    templateUrl: 'app/views/misc/faq.html'
  })
  .state('about-obbp', {
    url: '/about-obbp',
    templateUrl: 'app/views/misc/about-obbp.html'
  })
  .state('about-blood-donation', {
    url: '/about-blood-donation',
    templateUrl: 'app/views/misc/about-blood-donation.html'
  })
  .state('donate-blood', {
    url: '/donate-blood',
    templateUrl: 'app/views/misc/donate-blood.html'
  });
}]);
