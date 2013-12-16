;
var root = window;
(function (utility,$, undefined) {
    var dataService = (function () {
        return {
            getDeals: getDeals,
            getAllDeals: getAllDeals,
            getDeal: getDeal
        };

        function getDeals(){

        }

        function getAllDeals(){
            return $.ajax({
                url:'/api/v1/dealing',
                type:'GET',
                dateType:'JSON'
            })
        }

        function getDeal(id){
            return $.ajax({
                url:'/api/v1/dealing/'+id,
                type:'GET',
                dateType:'JSON'
            })
        }
    }());

    utility.dataService = dataService;
}(root.utility || (root.utility = {}), jQuery,undefined));