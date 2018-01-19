var assert = require('assert');
//just for testing mocha at project start
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3,5,3].indexOf(4), -1);
    });
  });
});