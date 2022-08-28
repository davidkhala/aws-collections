import assert from 'assert'
import {SQS} from '../sqs.js';

import {sleep} from '@davidkhala/light/index.js'
const sqs = new SQS();
const queue = 'standard-sqs';

describe('sqs', function (){
	this.timeout(0)
	it('list', async ()=>{
		const health = await sqs.ping()
		assert.ok(health);
		const queues = await sqs.list();
		console.debug(queues)
	})
	it('destroy', async ()=>{
		let queues = await sqs.list();
		await sqs.destroy(queues[0]);
		queues = await sqs.list();
		console.debug('immediate after deletion', queues);
		const sleepTime = 60000;
		await sleep(sleepTime);
		queues = await sqs.list();
		console.debug(`${sleepTime / 1000} seconds after deletion`, queues);
	})
	it('message', async ()=>{
		const QueueUrl = await sqs.create(queue);
		await sqs.send(QueueUrl, 'messageB');
		let Messages = await sqs.receive(QueueUrl);
		console.debug(Messages);
		const {ReceiptHandle} = Messages[0];
		await sqs.delete(QueueUrl, ReceiptHandle);
		Messages = await sqs.receive(QueueUrl);
		console.debug('after delete', Messages);
	})
})



