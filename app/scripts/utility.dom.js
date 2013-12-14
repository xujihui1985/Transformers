;
var root = window;
(function (utility, document, undefined) {
    var dom = (function () {
        return {
            createDiv: createDiv,
            setText: setText,
            findByText: findByText,
            bindClick: bindClick
        };

        function createDiv(id) {
            var element = document.createElement('div');
            element.id = id;
            return element;
        }

        function setText(div, text) {
            div.innerHTML = text;
        }

        function findByText(text) {
            var elements = document.querySelectorAll('div');
            var regex = new RegExp(text, 'ig');
            var results = [];
            [].forEach.call(elements, function (ele) {
                if (regex.test(ele.innerHTML)) {
                    results.push(ele);
                }
            });
            return results;
        }

        function bindClick(element, handler) {
            element.addEventListener('click', handler, false);
        }

    }());

    utility.dom = dom;
}(root.utility || (root.utility = {}), document, undefined));