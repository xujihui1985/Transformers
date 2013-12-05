'use strict';

angular.module('transformersApp')
  .controller('DealCtrl', function ($scope) {
    $scope.deals = [{"dealNumber":1,"dealDate":"2013-12-05","instrument":"Instrument A"},
	 {"dealNumber":2,"dealDate":"2013-12-06","instrument":"Instrument B"},
	 {"dealNumber":3,"dealDate":"2013-12-07","instrument":"Instrument C"}];

	$scope.gridOptions = { data: 'deals' };
  });
