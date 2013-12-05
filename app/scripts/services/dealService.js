'use strict';

transApp.factory('dealService', ['$resource', function ($resource) {
    var Deal = $resource('/api/dealing/:id', {id: '@id'});


    return Deal;
}]);

