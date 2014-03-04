module('async Test');

test('use sync test for async function will fail', function(){
    stop();
    var isTestPassed = false;
    setTimeout(function(){
        isTestPassed = true;

        ok(isTestPassed);
        start();
    },1000);

    //ok(isTestPassed);
});

asyncTest('can test async function', function(){
    var isTestPassed = false;
    setTimeout(function(){
        isTestPassed = true;
        ok(isTestPassed);
        start();
    },1000);
});


