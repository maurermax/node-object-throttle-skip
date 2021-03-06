object-throttle-skip
=========================

Node module to throttle an incoming stream of objects by letting some of them pass through, and throwing away others.

Within a specific timeframe a maximum number of x objects will pass.

## What's this for?
If you want to get a rough idea of what this module is for, look as this fiddle.

http://jsfiddle.net/5afahLdf/11/show

## Install
````
npm install object-throttle-skip
````

## Usage
````
var Throttle = require('throttle');
var maxObjectCount = 30;
var maxObjectTimeFrameMs = 30000;
var t = new Throttle(maxObjectTimeFrameMs, maxObjectCount);

function incomingObject(obj) {
  // if you want to know what the probability for the next object will be use
  console.log(t.getProbability());
  // decide fate whether this incoming object should be propagated further
  return t.throttleObject(obj);
  // as an alternative you can do
  // if (t.throttle()) return obj;
}
````

## More

- Inn case you choose a negative window size all objects will be accepted
