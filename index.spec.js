var expect = require('expect.js');
var Throttle = require('./index');
var TIME_WINDOW = 3000;
var WINDOW_SIZE = 30;
describe('object-throttle-skip', function() {
  var t;
  beforeEach(function() {
    t = new Throttle(TIME_WINDOW,WINDOW_SIZE);
  });
  it('has a constructor', function() {
    expect(Throttle).to.be.a('function');
  });
  it('throttle exists and returns true for the first item', function() {
    expect(t.throttle).to.be.a('function');
    expect(t.throttle()).to.be(true);
  });
  it('throttleObj exists and returns obj for the first item', function() {
    expect(t.throttleObject).to.be.a('function');
    expect(t.throttleObject('a')).to.be('a');
  });
  it('for 60 calls of throttle it will return less than 30 time true', function() {
    var c = 0;
    for (var i=0;i<WINDOW_SIZE*2;i++) {
      if (t.throttle()) c++;
    }
    expect(c).to.be.within(1, WINDOW_SIZE);
  });
  it('for a negative window size all items will be accepted', function() {
    var t2 = new Throttle(TIME_WINDOW, -1);
    var c = 0;
    for (var i=0;i<WINDOW_SIZE*2;i++) {
      if (t2.throttle()) c++;
    }
    expect(c).to.be(WINDOW_SIZE*2);
  });
  it('first probability will always be 1 afterwards probabilities will be less in case and object has been taken', function() {
    expect(t.getProbability()).to.be(1);
    var lastProb = 1;
    for (var i=0;i<WINDOW_SIZE*2;i++) {
      if (t.throttle()) {
        var newProb = t.getProbability();
        expect(newProb).to.be.lessThan(lastProb);
        lastProb = newProb;
      }
    }
  });
  it('after waiting for a full time window the probability will be back at 1', function(done) {
    this.timeout(TIME_WINDOW+2000);
    for (var i=0;i<WINDOW_SIZE*2;i++) {
      t.throttle();
    }
    setTimeout(function() {
      expect(t.getProbability()).to.be(1);
      done();
    }, TIME_WINDOW+1000);
  });
});
