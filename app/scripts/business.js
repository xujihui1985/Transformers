;
var root = window;
(function (dealing) {
    var FuturesDeal = (function () {
        function FuturesDeal(dataService) {
            this.dataService = dataService;
            this.hasCloseout = false;
        }

        FuturesDeal.prototype.closeOut = function (fudeal) {
            if (!(fudeal instanceof FuturesDeal)) {
                throw new Error('type error');
            }
            this.hasCloseout = fudeal.hasCloseout;
        };

        FuturesDeal.prototype.hasDeals = function () {
            return this.dataService.getDeals().length > 0;
        }

        return FuturesDeal;
    }());

    dealing.FuturesDeal = FuturesDeal;
}(root.dealing || (root.dealing = {})));