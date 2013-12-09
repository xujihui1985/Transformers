'use strict';

transApp.controller('DealCtrl', ['$scope', 'dealService','socket','toastr', function ($scope, Deal,socket,toastr) {

    socket.on('created', function (data) {
        $scope.deals = Deal.query();
        if($scope.model && (data.dealNumber ===  $scope.model.dealNumber)){
            toastr.success('the deal you are editing has bee changed by others'+data.dealNumber);
            $scope.model = Deal.get({id:data.dealNumber});
        }else{
            toastr.success('new deal has been created, dealNumber:'+data.dealNumber);
        }

    });
    $scope.selectDeal = '<button id="editBtn" type="button" class="btn btn-default btn-sm" ng-click="edit(row)" ><span class="glyphicon glyphicon-edit"></span></button> '
    $scope.deals = Deal.query();
    $scope.title = "Foreign Exchange";
    $scope.model = Deal.new();
    $scope.gridOptions = {
     data: 'deals',
     enableRowSelection:false,
     columnDefs: [{field:'dealNumber', displayName:'Deal No'},{field:'ticketNumber', displayName:'Ticket No'},{displayName:'Edit',cellTemplate:$scope.selectDeal}]
    };
    $scope.save = function (model) {
        var deal = new Deal(model);
        deal.$save();
        var existsDeal = $scope.deals.map(function(ele){
            return ele.dealNumber;
        }).indexOf(deal.dealNumber);
        if(existsDeal<0){
            $scope.deals.push(model);
        }
        socket.emit('deal-created',model);
    };
    $scope.edit = function (row) {
        $scope.model = Deal.get({id:row.entity.dealNumber});
    };
}]);
