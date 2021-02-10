var assert = require('assert');
describe('Basic Mocha String Test', function () {
  it('should return number of characters is 5', function () {
    assert.equal("Hello".length, 5);
  });
});