const {SQS} = require('../sqs');
const region = 'ap-southeast-1';
const sqs = new SQS(region);
const queue = 'topicA';

const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
const destroyTask = async () => {
	let queues = await sqs.list();
	await sqs.destroy(queues[0]);
	queues = await sqs.list();
	console.debug('immediate after deletion', queues);
	const sleepTime = 60000;
	await sleep(sleepTime);
	queues = await sqs.list();
	console.debug(`${sleepTime / 1000} seconds after deletion`, queues);
};
const task = async () => {
	const QueueUrl = await sqs.create(queue);
	await sqs.send(QueueUrl, 'messageB');
	let Messages = await sqs.receive(QueueUrl);
	console.debug(Messages);
	const {ReceiptHandle} = Messages[0];
	await sqs.delete(QueueUrl, ReceiptHandle);
	Messages = await sqs.receive(QueueUrl);
	console.debug('after delete', Messages);
	await destroyTask();

};
task();


