;
var root = window;
(function (utility, undefined) {
    utility.getWelcomeMessage = function () {
        var now = new Date().getHours();
        if (now < 12) {
            return 'Good Morning';
        } else if (now >= 12 && now < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };
}(root.utility || (root.utility = {}), undefined));