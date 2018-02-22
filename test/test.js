//js is processed into /temp/js folder during the build process, before browserify bundles the code into public/js/dist
var assert = require('assert');
var cube = require('../temp/js/cube.js');
describe('cube', function(){
  it('should equal a*a*a', function(){
    assert.equal(cube(5), 125);
    assert.equal(cube(2), 8);
    assert.equal(cube(1), 1);
    assert.equal(cube(0), 0);
  })
})
//just for testing mocha at project start
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3,5].indexOf(4), -1);
    });
    it('should return 0 when the value is at the beginning of the array', function() {
      assert.equal([142,211,374,51].indexOf(142), 0);
    });
    it('should return 1 when the value is at index 1', function() {
      assert.equal([142,211,374,51].indexOf(211), 1);
    });
  });
});