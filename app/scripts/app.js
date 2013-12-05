'use strict';

angular.module('transformersApp', ["ngGrid"])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {templateUrl: 'views/main.html',controller: 'MainCtrl'})
	  .when('/deal', {templateUrl: 'views/deal.html', controller: 'DealCtrl'})
      .otherwise({
        redirectTo: '/'
      });
  });
