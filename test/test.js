var test = require('tape'),
    roundDate = require("../roundDate.js");

var now = new Date(),
    nowTestName = "millisecond rounding test, interval=60min, for random date:" + now.toISOString();

var testCases = {
    "basic test, interval=60min": {
        date: "Fri Jan 30 2015 09:33:49 GMT+1000",
        round: "Fri Jan 30 2015 10:00:00 GMT+1000",
        floor: "Fri Jan 30 2015 09:00:00 GMT+1000",
        ceil: "Fri Jan 30 2015 10:00:00 GMT+1000",
        interval: 60 * 60
    },
    "rounding down, interval=60min": {
        date: "Fri Jan 30 2015 09:15:00 GMT+1000",
        round: "Fri Jan 30 2015 09:00:00 GMT+1000",
        floor: "Fri Jan 30 2015 09:00:00 GMT+1000",
        ceil: "Fri Jan 30 2015 10:00:00 GMT+1000",
        interval: 60 * 60
    },
    "no rounding, interval=60min": {
        date: "Fri Jan 30 2015 09:00:00 GMT+1000",
        round: "Fri Jan 30 2015 09:00:00 GMT+1000",
        floor: "Fri Jan 30 2015 09:00:00 GMT+1000",
        ceil: "Fri Jan 30 2015 09:00:00 GMT+1000",
        interval: 60 * 60
    },
    "basic test, interval=45min": {
        date: "Fri Jan 30 2015 09:15:00 GMT+1000",
        round: "Fri Jan 30 2015 09:00:00 GMT+1000",
        floor: "Fri Jan 30 2015 09:00:00 GMT+1000",
        ceil: "Fri Jan 30 2015 09:45:00 GMT+1000",
        interval: 45 * 60
    },
    "basic test, interval=5min": {
        date: "Fri Jan 30 2015 09:16:00 GMT+1000",
        round: "Fri Jan 30 2015 09:15:00 GMT+1000",
        floor: "Fri Jan 30 2015 09:15:00 GMT+1000",
        ceil: "Fri Jan 30 2015 09:20:00 GMT+1000",
        interval: 5 * 60
    },
    "basic test, interval=90min": {
        date: "Fri Jan 30 2015 17:15:00 GMT+1000",
        round: "Fri Jan 30 2015 18:00:00 GMT+1000",
        floor: "Fri Jan 30 2015 16:30:00 GMT+1000",
        ceil: "Fri Jan 30 2015 18:00:00 GMT+1000",
        interval: 90 * 60
    },
    "day overflow test, interval=70min": {
        date: "Fri Jan 30 2015 23:30:00 GMT+1000",
        round: "Fri Jan 30 2015 23:20:00 GMT+1000",
        floor: "Fri Jan 30 2015 23:20:00 GMT+1000",
        ceil: "Sat Jan 31 2015 00:30:00 GMT+1000",
        interval: 70 * 60
    },
    nowTestName: {
        date: now,
        round: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + Math.round(now.getMinutes() / 60)),
        floor: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()),
        ceil: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1),
        interval: 60 * 60
    },
    "millisecond rounding test, interval=0.5 seconds": {
        date: "Fri Jan 30 2015 09:33:49.123 GMT+1000",
        round: "Fri Jan 30 2015 09:33:49.000 GMT+1000",
        floor: "Fri Jan 30 2015 09:33:49.000 GMT+1000",
        ceil: "Fri Jan 30 2015 09:33:49.500 GMT+1000",
        interval: 0.5
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
            rounded = roundDate.round(testCase.interval, d),
            floored = roundDate.floor(testCase.interval, d),
            ceilinged = roundDate.ceil(testCase.interval,  d);

        t.equal(rounded.toISOString(), (new Date(testCase.round)).toISOString(), "round operation");
        t.equal(floored.toISOString(), (new Date(testCase.floor)).toISOString(), "floor operation");
        t.equal(ceilinged.toISOString(), (new Date(testCase.ceil )).toISOString(), "ceil  operation");
        t.end();
    });
});