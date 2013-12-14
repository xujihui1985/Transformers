module('utility test');

test('pass test', function(){
   ok(true);
});

test('fail test', function(){
    ok(false);
});

module('utility test2', {
    setup:function(){

    },
    teardown: function(){

    }
});

