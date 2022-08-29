import assert from 'assert';
import {SQS, Message} from '../sqs.js';

import {sleep} from '@davidkhala/light/index.js';

const sqs = new SQS();
const queue = 'standard-sqs';

describe('sqs', function () {
	this.timeout(0);
	it('list', async () => {
		const health = await sqs.ping();
		assert.ok(health);
		const q = await sqs.getQueueUrl(queue);
		console.info(q);
		const queues = await sqs.list();
		assert.ok(queues.includes(q));
	});
	it('destroy', async () => {
		let queues = await sqs.list();
		const message = Message.FromSQS(queues[0], sqs);
		await message.destroy();
		queues = await sqs.list();
		console.debug('immediate after deletion', queues);
		const sleepTime = 60000;
		await sleep(sleepTime);
		queues = await sqs.list();
		console.debug(`${sleepTime / 1000} seconds after deletion`, queues);
	});
	it('create', async () => {
		const QueueUrl = await sqs.create(queue);
		console.info(QueueUrl);
	});
	it('create fifo', async () => {
		const QueueUrl = await sqs.create(queue, true);
		console.info(QueueUrl);

	});
	it('message fifo', async () => {
		const message = new Message(queue);
		message.asFIFO();
		await message.send('fifo message');

		const Messages = await message.receive();
		console.info(Messages);
	});
	it('message', async () => {
		const message = new Message(queue);
		await message.send('messageB', 10000);
		let Messages = await message.receive({timeout: 11000});
		console.debug(Messages);

		const {ReceiptHandle} = Messages[0];
		await message.delete(ReceiptHandle);
		Messages = await message.receive();
		console.debug('after delete', Messages);
	});
});



