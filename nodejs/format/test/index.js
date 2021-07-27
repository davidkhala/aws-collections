const {regions} = require('../index');
const assert = require('assert');
describe('aws', () => {
	it('region size', () => {
		assert.strictEqual(regions.length, 23);
	});
});