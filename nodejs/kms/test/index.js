
const {KMS} = require('../kms');
const assert = require('assert');
const {Uint8Array2String, String2Uint8Array}= require('khala-light-util')
describe('kms', () => {
	const keyId = 'mrk-6b3d47c784234a37975d924aaadb54a5';
	const kms = new KMS(keyId);
	it('connect', async () => {
		const result = await kms.connect();
		console.debug(result);
	});
	it('sign and verify', async () => {

		const message = 'abc';
		await kms.connect();
		const signature = await kms.sign(message);
		assert.deepStrictEqual(String2Uint8Array(Uint8Array2String(signature)), signature);
		const isValid = await kms.verify(message, signature);
		assert.ok(isValid);
	});
});