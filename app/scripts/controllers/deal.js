'use strict';

transApp.controller('DealCtrl', ['$scope', 'dealService','socket','toastr', function ($scope, Deal,socket,toastr) {

    socket.on('created', function (data) {
        toastr.success('new deal has been created, dealNumber:'+data.dealNumber);
    });

    $scope.deals = Deal.query();
    $scope.title = "Foreign Exchange";
    $scope.model = Deal.new();
    $scope.save = function (model) {
        console.log(model);
        var deal = new Deal(model);
        deal.$save();
        socket.emit('deal-created',model);
    };
    $scope.edit = function (id) {

    };
    $scope.gridOptions = { data: 'deals' };
}]);
