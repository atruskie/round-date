# round-date


[![Build Status](https://travis-ci.org/atruskie/round-date.png)](https://travis-ci.org/atruskie/round-date)


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
```

# Methods

```
var roundDate = require("roundDate")
```

## var d = roundDate.round(roundToSeconds, date)

Return a new date rounded to the nearest `roundToSeconds` block.
Rounding is aligned to midnight of `date`.

## var d = roundDate.floor(roundToSeconds, date)

Return a new date floored to the nearest `roundToSeconds` block.
Rounding is aligned to midnight of `date`.

## var d = roundDate.ceil(roundToSeconds, date)

Return a new date ceilinged to the nearest `roundToSeconds` block.
Rounding is aligned to midnight of `date`.

# Install

With [npm](https://npmjs.org) do:

```
npm install round-date
```

# License

MIT
