var test = require('tape'),
    roundDate = require("../index.js");

var testCases = {
    "basic test, interval=60": {
        date: "Fri Jan 30 2015 09:33:49 GMT+1000",
        round: "Fri Jan 30 2015 10:00:00 GMT+1000",
        floor: "Fri Jan 30 2015 09:00:00 GMT+1000",
        ceil: "Fri Jan 30 2015 10:00:00 GMT+1000",
        interval: 60 * 60
    },
    "rounding down, interval=60": {
        date: "Fri Jan 30 2015 09:15:00 GMT+1000",
        round: "Fri Jan 30 2015 09:00:00 GMT+1000",
        floor: "Fri Jan 30 2015 09:00:00 GMT+1000",
        ceil: "Fri Jan 30 2015 10:00:00 GMT+1000",
        interval: 60 * 60
    },
    "no rounding, interval=60": {
        date: "Fri Jan 30 2015 09:00:00 GMT+1000",
        round: "Fri Jan 30 2015 09:00:00 GMT+1000",
        floor: "Fri Jan 30 2015 09:00:00 GMT+1000",
        ceil: "Fri Jan 30 2015 09:00:00 GMT+1000",
        interval: 60 * 60
    },
    "basic test, interval=45": {
        date: "Fri Jan 30 2015 09:15:00 GMT+1000",
        round: "Fri Jan 30 2015 09:00:00 GMT+1000",
        floor: "Fri Jan 30 2015 09:00:00 GMT+1000",
        ceil: "Fri Jan 30 2015 09:45:00 GMT+1000",
        interval: 45 * 60
    },
    "basic test, interval=5": {
        date: "Fri Jan 30 2015 09:16:00 GMT+1000",
        round: "Fri Jan 30 2015 09:15:00 GMT+1000",
        floor: "Fri Jan 30 2015 09:15:00 GMT+1000",
        ceil: "Fri Jan 30 2015 09:20:00 GMT+1000",
        interval: 5 * 60
    },
    "basic test, interval=90": {
        date: "Fri Jan 30 2015 17:15:00 GMT+1000",
        round: "Fri Jan 30 2015 18:00:00 GMT+1000",
        floor: "Fri Jan 30 2015 16:30:00 GMT+1000",
        ceil: "Fri Jan 30 2015 18:00:00 GMT+1000",
        interval: 90 * 60
    },
    "day overflow test, interval=70": {
        date: "Fri Jan 30 2015 23:30:00 GMT+1000",
        round: "Fri Jan 30 2015 23:20:00 GMT+1000",
        floor: "Fri Jan 30 2015 23:20:00 GMT+1000",
        ceil: "Sat Jan 31 2015 00:30:00 GMT+1000",
        interval: 70 * 60
    }
};

test("round date should throw if given 1 argument", function(t) {
    t.throws(function() {
        roundDate.round(60);
    });
    t.end();
});

test("round date should throw if given more than 2 arguments", function(t) {
    t.throws(function() {
        roundDate.round(60, 1, 2, 3);
    });
    t.end();
});

Object.keys(testCases).map(function(key) {
    test(key, function (t) {
        var testCase = testCases[key],
            d = new Date(testCase.date),
            a = roundDate.round(testCase.interval, d),
            b = roundDate.floor(testCase.interval, d),
            c = roundDate.ceil(testCase.interval,  d);

        t.equal(a.toISOString(), (new Date(testCase.round)).toISOString(), "round operation");
        t.equal(b.toISOString(), (new Date(testCase.floor)).toISOString(), "floor operation");
        t.equal(c.toISOString(), (new Date(testCase.ceil )).toISOString(), "ceil  operation");
        t.end();
    });
});