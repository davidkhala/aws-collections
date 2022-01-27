import {AWSKMS} from '../kms.js';
import assert from 'assert';
import {Uint8Array2String, String2Uint8Array} from '@davidkhala/light';

describe('kms:default', () => {

	const kms = new AWSKMS();
	it('list', async () => {
		const result = await kms.list();
		console.debug(result);
	});
	it('inspect', async () => {
		const keyId = '5a69cf93-d888-4259-b74d-7eff50ca46c7';
		const info = await kms.as(keyId);
		console.debug(info);
	});

});
describe('kms: customer key lifecycle', function () {
	this.timeout(0);
	const kms = new AWSKMS();
	it('create & Delete', async () => {
		const data = await kms.create();
		console.info(data);
		const {KeyId} = data;
		const receipt = await kms.remove(KeyId);
		console.info(receipt);
	});

	// TODO
	it.skip('sign and verify', async () => {
		const keyId = '5a69cf93-d888-4259-b74d-7eff50ca46c7';
		const message = 'abc';
		await kms.as(keyId);
		const signature = await kms.sign(message);
		assert.deepStrictEqual(String2Uint8Array(Uint8Array2String(signature)), signature);
		const isValid = await kms.verify(message, signature);
		assert.ok(isValid);
	});
	after(async () => {

	});
});