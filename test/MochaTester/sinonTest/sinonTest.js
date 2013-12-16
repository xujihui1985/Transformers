mocha.setup({timeout: 5000});
describe('Spies Test', function () {
    var sut = utility.dom;
    var testobj = {
        doSth: function () {
        }
    }
    it('should spy on a call back', function () {
        var spy = sinon.spy();
        sut.callCallback(spy);
        expect(spy.called).to.be.true;
    });

    it('should return the actual value when true function is provided', function () {
        var spy = sinon.spy(function () {
            return 5;
        });
        var result = sut.callCallbackWithReturnValue(spy);
        expect(result).to.equal(5);
    });

    it('can also spy on a method of an object', function () {
        //sometimes the callback function is on another object. you can simply spy
        //the method on that object
        var spy = sinon.spy(testobj, 'doSth');
        sut.callCallback(spy);
        expect(spy.called).to.be.true;
    });

    it('spyCall.calledWith', function () {
        //sometimes the callback function is on another object. you can simply spy
        //the method on that object
        var spy = sinon.spy();
        sut.callCallbackAndPassParameter(spy);
        expect(spy.calledWith('hello')).to.be.true;
    });

});

describe('test jquery', function () {

    beforeEach(function () {
        sinon.spy(jQuery, "ajax");
    });

    afterEach(function () {
        jQuery.ajax.restore();
    });

    it('should able to call ajax when getJson is fired', function () {
        jQuery.getJSON('/some/url');
        expect(jQuery.ajax.calledOnce).to.be.true;
        expect(jQuery.ajax.getCall(0).args[0].url).to.equal('/some/url');
    });

});

describe('stub test', function () {
    var sut = utility.dom,
        FuturesDeal = dealing.FuturesDeal;

    it('should return world when correct logic is called', function () {
        var callback = sinon.stub();
        callback.withArgs('hello').returns('world');
        var result = sut.callCallbackAndPassParameter(callback);
        expect(result).to.equal('world');
    });

    it('should hasDeal if dataservice is work fine', function () {
        var dataServiceStub = sinon.stub({getDeals: function () {
        }});
        dataServiceStub.getDeals.returns([
            {dealNumber: 1}
        ]);
        var fudeal = new FuturesDeal(dataServiceStub);
        expect(fudeal.hasDeals()).to.be.true;
    });

    it('should throw exception if the closeout deal is not a future deal', function () {
        var dataServiceStub = sinon.stub({getDeals: function () {
        }});
        var fudeal = new FuturesDeal(dataServiceStub);
        expect(function () {
            fudeal.closeOut({});
        }).to.throw(Error);
    });

});

describe('fake times tests', function () {

    var clock,
        initDate = +(new Date(2013, 0, 01));


    beforeEach(function () {
        clock = sinon.useFakeTimers(initDate);
    });

    afterEach(function () {
        clock.restore();
    });

    it('should be able to fake the current date', function () {
        // month begin with 0 to 11
        var date1 = new Date();
        console.log(date1.toLocaleDateString());

        // move the clock forward 1 min
        clock.tick(60000);
        var date2 = new Date();
        console.log(date2.getTime());
        clock.restore();
    });

    it('should return correct welcome message in specified time', function () {

        var message = utility.getWelcomeMessage();
        expect(message).to.equal('Good Morning');

        clock.tick((60000 * 60 * 13));
        message = utility.getWelcomeMessage();
        expect(message).to.equal('Good Afternoon');

        clock.tick((60000 * 60 * 6));
        message = utility.getWelcomeMessage();
        expect(message).to.equal('Good Evening');
    });

});

describe('use fake xhr', function () {
    it('should intecept all the incoming request', function () {
        var requests = [];
        var xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function (req) {
            requests.push(req);
        }
        jQuery.getJSON('/some/url');
        expect(requests.length).to.equal(1);
        requests.forEach(function (req) {
            expect(req.url).to.equal('/some/url');
            expect(req.method).to.equal('GET');
        });
        xhr.restore();
    });

    it('should get the data from API', function () {
        var requests = [];
        var xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function (req) {
            requests.push(req);
        };
        var spy = sinon.spy();
        utility.dataService.getAllDeals().done(spy);
        requests[0].respond(200, {"Content-Type": "application/json"}, '{"dealNumber":1}');
        requests.forEach(function (req) {
            expect(req.url).to.equal('/api/v1/dealing');
            expect(req.method).to.equal('GET');
        });
        console.log(spy.args[0][0]);
        expect(spy.calledWith({dealNumber: 1})).to.be.true;
        xhr.restore();
    });


});

describe('fake server test', function () {
    var server;
    beforeEach(function () {
        server = sinon.fakeServer.create();
        server.respondWith('GET', '/api/v1/dealing', [200, {"Content-Type": "application/json"}, JSON.stringify({dealNumber: 2})]);
        //with regex to match such url as /api/v1/dealing/1
        server.respondWith('GET', /\/api\/v1\/dealing\/(\d+)/, [200, {"Content-Type": "application/json"}, JSON.stringify({dealNumber: 1, instrument: 'test'})]);
    });

    afterEach(function () {
        server.restore();
    });

    it('should also get the data from API', function () {
        var spy = sinon.spy();
        utility.dataService.getAllDeals().done(spy);
        server.respond();
        sinon.assert.calledWith(spy, {dealNumber: 2});
    });

    it('should get the specific deal from api', function () {
        var spy = sinon.spy();
        utility.dataService.getDeal(1).done(spy);
        server.respond();
        sinon.assert.calledWith(spy, {dealNumber: 1, instrument: 'test'});
    });
});

describe('when API ready', function () {
    it.skip('should also get the data from API', function (done) {

        utility.dataService.getAllDeals().then(function (result) {
            expect(result.name).to.equal('transformers');
            expect(result.dependencies.arr.length).to.equal(3);
            done();
        });
    });
});