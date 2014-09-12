/**
 * Throttle skip creates a throtteler that will let pass at most maxItems within a timeframe window of windowSizeMs. The more items appear within the time frame the more the probability for an item to be returned decreases.
 * @param {number} windowSizeMs the window size in milliseconds
 * @param {number} maxItems     the number of items that can appear within the window size as a maximum
 */
ThrottleSkip = function(windowSizeMs, maxItems) {
  this.timestamps = [];
  this.windowSizeMs = windowSizeMs;
  this.maxItems = maxItems;
};

/**
 * @return {number} the currently configured window size in milliseconds
 */
ThrottleSkip.prototype.getWindowSizeMs = function() {
  return this.windowSizeMs;
};

/**
 * @param {number} newSizeMs the new window size in milliseconds to replace the old window size
 */
ThrottleSkip.prototype.setWindowSizeMs = function(newSizeMs) {
  this.windowSizeMs = newSizeMs;
  this.clean();
};


/**
 * @return {number} the currently set maximum number of items
 */
ThrottleSkip.prototype.getMaxItems = function() {
  return this.maxItems;
};

/**
 * @param {number} newMaxItems sets the new number of max items that are used by this throttler
 */
ThrottleSkip.prototype.setMaxItems = function(newMaxItems) {
  this.maxItems = newMaxItems;
  this.clean();
};

/**
 * throttle returns at maximum maxItems within the configured time window
 * @param  {object} obj       input object
 * @return {objct}           returns the same object in case it has been selected by the throtteling algorithm, or null in case the item should be discarded
 */
ThrottleSkip.prototype.throttleObject = function(obj) {
  if (this.throttle()) {
    return obj;
  } else {
    return null;
  }
};

/**
 * @return {boolean} true if this next items should be selected by the throtteling algorithm or false in case it should be discarded
 */
ThrottleSkip.prototype.throttle = function() {
    if (Math.random()<this.getProbability()) {
      this.timestamps.push(Date.now());
      return true;
    } else {
      return false;
    }
};

/**
 * @return {number} the probability with which an object will be taken at that point in time
 */
ThrottleSkip.prototype.getProbability = function() {
    if (this.maxItems<0) return 1;
    this.clean();
    var space = this.maxItems-this.timestamps.length;
    if (space<=0) return 0;
    var prob = space/this.maxItems;
    return prob;
};

/**
 * cleans the timestamps array (not for external use)
 */
ThrottleSkip.prototype.clean = function() {
  _clean(this.timestamps, this.windowSizeMs);
};

function _clean(arr, maxTime) {
  var now = Date.now();
  while (arr.length>0 && (arr.length>this.maxItems || (now-arr[0])>maxTime)) {
    arr.shift();
  }
}

module.exports = ThrottleSkip;
