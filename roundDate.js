(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function () {

    function roundDate(roundStyle, roundToSeconds, date, startOfDay) {
        if (arguments.length !== 3 && arguments.length !== 4) {
            throw new Error("Expected  2 or 3 arguments");
        }

        var date = new Date(date);
        
        // optionally use a different relative start point
        // useful for working in timezones other than local
        if (startOfDay) {
            startOfDay = new Date(startOfDay);
        }
        else {
            startOfDay = new Date(date).setHours(0, 0, 0);
        }
        
        var roundToMilliseconds = roundToSeconds * 1000,
            msFromMidnight = (+date) - (+startOfDay),
            remainder = msFromMidnight % roundToMilliseconds,
            result = msFromMidnight;

        if (remainder !== 0) {
            if (roundStyle === "round") {
                var fraction = (msFromMidnight / roundToMilliseconds) % 1;
                roundStyle = fraction >= 0.5 ? "ceil" : "floor";
            }

            if (roundStyle === "floor") {
                result -= remainder
            }
            else if (roundStyle === "ceil") {
                result += (roundToMilliseconds - remainder);
            }
            else {
                return;
            }
        }

        return new Date((+startOfDay) + result);
    }

    return {
        round: roundDate.bind(null, "round"),
        floor: roundDate.bind(null, "floor"),
        ceil: roundDate.bind(null, "ceil")
    };
}));

