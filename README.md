# round-date

[![Build Status](https://travis-ci.org/atruskie/round-date.svg)](https://travis-ci.org/atruskie/round-date)

---
# Overview

A small module for rounding dates to arbitrary intervals.
For example it will allow you to round up or down to the nearest 45 min block in a day.

# Example

```
var roundDate = require("round-date");

// round to the nearest 45 minute block
var roundedDate = roundDate.round(45 * 60, new Date());

// floor to the most recent 30 second offset
var nearest30Seconds = roundDate.floor(30, new Date());

// floor to the nearest 90min block, using midnight in Brisbane, Australia as the start point
// (and assuming you are not currently in the +10 timezone)
var roundedDateBne = roundDate.round(90 * 60, "2015-01-30T03:45:00+1000", "2015-01-30T00:00:00+1000");
// produces: 2015-01-29T18:30:00.000Z (equivalent to: 2015-01-30T04:30:00.000+1000)
```

# Methods

```
var roundDate = require("roundDate")
```

## round(roundToSeconds, date[, startDate])

Return a new date rounded to the nearest `roundToSeconds` block.

## floor(roundToSeconds, date[, startDate])

Return a new date floored to the nearest `roundToSeconds` block.

## ceil(roundToSeconds, date[, startDate])

Return a new date ceilinged to the nearest `roundToSeconds` block.

---

### The `startDate` parameter
If `startDate` is not defined, rounding is aligned to midnight of `date` in the current local timezone.
If `startDate` is provided, rounding is instead relatively aligned to the supplied `startDate`.

Specifying `startDate` is necessary when the current local timezone of the environment does not match the timezone the calculations are for.

# Install

With [npm](https://npmjs.org) do:

```
npm install round-date
```

# License

MIT
