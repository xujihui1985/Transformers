'use strict';

angular.module('transformersApp', ["ngGrid"])
angular.module('transformersApp', [])
var transApp = angular.module('transformersApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {templateUrl: 'views/main.html',controller: 'MainCtrl'})
	  .when('/deal', {templateUrl: 'views/deal.html', controller: 'DealCtrl'})
      .otherwise({
        redirectTo: '/'
      });
  });
