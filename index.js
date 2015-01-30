function roundDate(roundStyle, roundToSeconds, date) {
    if (arguments.length !== 3) {
        throw new Error("Expected  2 arguments");
    }

    var startOfDay = new Date(date).setHours(0, 0, 0),
        roundToMilliseconds = roundToSeconds * 1000,
        msFromMidnight = (+date) - startOfDay,
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

    return new Date(startOfDay + result);
}

module.exports =  {
    round: roundDate.bind(null, "round"),
    floor: roundDate.bind(null, "floor"),
    ceil: roundDate.bind(null, "ceil")
};