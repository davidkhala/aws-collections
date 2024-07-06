import assert from 'assert';
import {SQS} from '../sqs.js';


const sqs = new SQS();
delete sqs.logger
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

		const QueueUrl = await sqs.createSync(nq);
		console.info(QueueUrl);
	});
	it('create fifo', async () => {
		const QueueUrl = await sqs.createSync(nq, true);
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
		await sqs.destroySync();
	});
	it('destroy fifo', async ()=>{
		sqs.as('https://sqs.ap-east-1.amazonaws.com/606262941110/test.fifo');
		await sqs.destroySync();
	})
});



