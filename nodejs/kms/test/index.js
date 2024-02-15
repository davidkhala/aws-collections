import {AWSKMS} from '../kms.js';
import assert from 'assert';

describe('kms', function () {
	this.timeout(0)

	const kms = new AWSKMS();
	it('list and inspect', async () => {
		const result = await kms.list();
		for (const {KeyId} of result) {
			const info = await kms.as(KeyId);
			const {KeyManager,KeyState } = info;
			if (KeyManager !== 'AWS') {
				console.info(info);
				if(KeyState!== 'PendingDeletion'){
					await kms.remove(KeyId);
				}
			}
		}
	});

	it('key lifecycle: create, sign, verify, delete', async () => {
		const {KeyId} = await kms.createEC();

		const message = 'abc';
		await kms.as(KeyId);
		const signature = await kms.sign(message);
		const isValid = await kms.verify(message, signature);
		assert.ok(isValid);

		await kms.remove(KeyId);

	});

});
