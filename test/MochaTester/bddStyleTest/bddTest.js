mocha.setup({timeout:5000});
describe('my test suite', function () {

    it('should pass', function () {
        expect(1).to.equal(1);

    });

    describe('Array manipulate test', function () {

        var mockArr = [];

        beforeEach(function () {
            [1, 2, 3, 4, 5].forEach(function (ele) {
                mockArr.push(ele);
            });
        });

        afterEach(function () {
            mockArr = [];
        });

        it('can pop element from array', function () {
            mockArr.pop();
            expect(mockArr.length).to.equal(4);
        });

        it('can push element into an array', function () {
            mockArr.push(6)
            expect(mockArr.length).to.equal(6);
        });

    });

    describe('exclusive test suite', function () {

        /* it.only('should only run this test', function () {
         expect(1).to.equal(1);
         });*/

        it.skip('will be skipped', function () {
            expect(1).to.equal(2);
        });
    });

    describe('async test', function () {

        this.timeout(5000);
        it('should pass the test', function (done) {
            setTimeout(function () {
                expect(1).to.equal(1);
                done();
            }, 3000);
        });

    });
});