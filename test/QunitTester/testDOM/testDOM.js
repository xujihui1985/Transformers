var sut = utility.dom;
module('create fake DOM element', {
    setup: function () {
        var container = document.createElement("div");
        container.id = "container";
        document.body.appendChild(container);
    },
    teardown: function () {
        var container = document.querySelector("#container");
        document.body.removeChild(container);
    }
});

test('can find container from module', function () {
    var container = document.querySelector("#container");
    ok(container);
});

test('can create dom with utility dom library', function () {
    var container = document.querySelector("#container");
    var element = sut.createDiv('div1');
    container.appendChild(element);
    ok(container.querySelector('#div1'), 'can find new created div from container');
});

test('can set text with utility dom library', 2, function () {
    var container = document.querySelector("#container");
    var element = sut.createDiv('div1');
    sut.setText(element, 'hello world');
    container.appendChild(element);
    ok(container.querySelector('#div1'), 'can find new created div from container');
    ok(container.querySelector('#div1').innerHTML === 'hello world', 'the text on the div is correct');
});

test('can find div by inner html', 1, function () {
    var container = document.querySelector("#container");
    var element = sut.createDiv('div1');
    sut.setText(element, 'hello world sean');
    container.appendChild(element);
    element = utility.dom.createDiv('div2');
    sut.setText(element, 'hello world york');
    container.appendChild(element);
    var elementsfound = sut.findByText('hello world');
    strictEqual(elementsfound.length, 2);
});

test('fire dom event', 1, function () {
    var container = document.querySelector("#container"),
        button = document.createElement('button'),
        element = sut.createDiv('div1');

    // arrange
    sut.bindClick(button, function () {
        element.innerHTML = 'clicked';
    });
    container.appendChild(element);
    container.appendChild(button);

    //act
    var event = new MouseEvent('click');
    button.dispatchEvent(event);

    //assert
    var elementsfound = sut.findByText('clicked');
    strictEqual(elementsfound.length, 1);
});


module('Do not fake DOM test');
test('can not find container from this module', function () {
    var elements = document.querySelector("#container");
    ok(elements === null);
});
