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
        var dataServiceStub = sinon.stub({getDeals:function(){}});
        dataServiceStub.getDeals.returns([
            {dealNumber: 1}
        ]);
        var fudeal = new FuturesDeal(dataServiceStub);
        expect(fudeal.hasDeals()).to.be.true;
    });

    it('should throw exception if the closeout deal is not a future deal', function () {
        var dataServiceStub = sinon.stub({getDeals:function(){}});
        var fudeal = new FuturesDeal(dataServiceStub);
        expect(function () {
            fudeal.closeOut({});
        }).to.throw(Error);
    });

});