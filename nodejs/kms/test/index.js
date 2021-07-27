const {KMS, SigningAlgorithm} = require('../kms');
const assert = require('assert');
describe('kms', () => {
	const keyId = 'mrk-6b3d47c784234a37975d924aaadb54a5';
	it('smoke', async () => {

		new KMS(keyId);
	});
	it('sign', async () => {
		const kms = new KMS(keyId);
		const message = 'abc';
		const result = await kms.sign(message, undefined, SigningAlgorithm.ECDSA_SHA_256);
		const expected = '3046022100d283dfd1b0230a520435ea603597e8c404927cfa85ea671c75f80b4a8d392c5b022100c4870b24c9ca875cb97c6a41ecfbc5b1c00dacc3c74812a55b6c42c20d9f6cc9';
		// TODO signature not consistent
		assert.strictEqual(result, expected);
	});
});