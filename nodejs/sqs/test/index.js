import assert from 'assert';
import {SQS} from '../sqs.js';

import {sleep} from '@davidkhala/light/index.js';

const sqs = new SQS();
const queue = 'standard-sqs';
const nq = 'test';

describe('sqs', function () {
	this.timeout(0);
	it('list', async () => {
		const health = await sqs.ping();
		assert.ok(health);
		const q = await sqs.getQueueUrl(queue);
		assert.equal(q, 'https://sqs.ap-east-1.amazonaws.com/606262941110/standard-sqs');
		const queues = await sqs.list();
		assert.ok(queues.includes(q));
		console.debug(queues);
	});

	it('create', async () => {
		const QueueUrl = await sqs.create(nq);
		console.info(QueueUrl);
	});
	it('create fifo', async () => {
		const QueueUrl = await sqs.create(nq, true);
		console.info(QueueUrl);

	});
	it('message fifo', async () => {
		sqs.as('https://sqs.ap-east-1.amazonaws.com/606262941110/test.fifo');
		await sqs.send('fifo message');

		const Messages = await sqs.receive();
		console.info(Messages);
	});
	it('message', async () => {
		sqs.as('https://sqs.ap-east-1.amazonaws.com/606262941110/test');
		await sqs.send('messageB', 10000);
		let Messages = await sqs.receive({timeout: 11000});
		console.debug(Messages);

		const {ReceiptHandle} = Messages[0];
		await sqs.delete(ReceiptHandle);
		Messages = await sqs.receive();
		console.debug('after delete', Messages);
	});
	it('destroy', async () => {
		sqs.as('https://sqs.ap-east-1.amazonaws.com/606262941110/test');

		await sqs.destroy();
		sqs.as('https://sqs.ap-east-1.amazonaws.com/606262941110/test.fifo');
		await sqs.destroy();
		const q1 = await sqs.list();
		console.debug('immediate after deletion', q1);
		const sleepTime = 60000;
		await sleep(sleepTime);
		const q2 = await sqs.list();
		console.debug(`${sleepTime / 1000} seconds after deletion`, q2);
		assert.equal(q2.length, q1.length - 2);
	});
});



