import AWSClass from '@davidkhala/aws-format';
import {SQSClient, SendMessageCommand, CreateQueueCommand, ListQueuesCommand} from '@aws-sdk/client-sqs';

export class SQS extends AWSClass {

	constructor(param) {
		super(param);
		this.as(SQSClient);

	}

	/**
	 *
	 * @param {string} QueueName
	 * @param {boolean} FifoQueue Designates a queue as FIFO, When you set this attribute, you must also provide the `MessageGroupId` for your messages explicitly.
	 * @return {Promise<String>} QueueUrl
	 */
	async create(QueueName, {FifoQueue} = {}) {
		const opts = {
			QueueName,
			Attributes: {}
		};
		if (FifoQueue) {
			opts.Attributes.FifoQueue = true;
			opts.QueueName = `${QueueName}.fifo`;
		}

		const createResult = await this.sendCommand(opts, CreateQueueCommand);
		return createResult.QueueUrl;
	}

	/**
	 *
	 * @param {string} QueueName
	 */
	async getQueueUrl(QueueName) {
		const {QueueUrl} = await this.sqs.getQueueUrl({QueueName}).promise();
		return QueueUrl;
	}

	/**
	 * Deletes the queue specified by the QueueUrl, regardless of the queue's contents.
	 * @param {string} QueueUrl
	 */
	async destroy(QueueUrl) {
		const opts = {QueueUrl};
		await this.sqs.deleteQueue(opts).promise();
	}

	/**
	 * Deletes the messages in a queue specified by the QueueURL parameter.
	 * @param {string} QueueUrl
	 */
	async clean(QueueUrl) {
		const opts = {QueueUrl};
		await this.purgeQueue(opts).promise();
	}

	/**
	 *
	 * @return {Promise<String[]>}
	 */
	async list() {
		const listResult = await this.sendCommand({}, ListQueuesCommand);

		const {QueueUrls} = listResult;
		return QueueUrls;
	}

	/**
	 *
	 * @param {string} QueueUrl
	 * @param {string} message
	 * @param {object} extraOpts for attribute `DelaySeconds`, `MessageGroupId`
	 * @return {Promise<SQS.SendMessageResult>}
	 */
	async send(QueueUrl, message, extraOpts = {}) {
		const opts = {
			MessageBody: message,
			QueueUrl
		};
		Object.assign(opts, extraOpts);
		return await this.sqs.sendMessage(opts).promise();
	}

	/**
	 *
	 * @param {string} QueueUrl
	 * @param {number} WaitTimeSeconds
	 * @param {number} MaxNumberOfMessages
	 * @return {Promise<SQS.Message[]>}
	 */
	async receive(QueueUrl, {WaitTimeSeconds, MaxNumberOfMessages} = {MaxNumberOfMessages: 1}) {
		const opts = {QueueUrl};
		if (WaitTimeSeconds && typeof WaitTimeSeconds === 'number') {
			if (WaitTimeSeconds < 0 || WaitTimeSeconds > 20) {
				throw Error(`Invalid WaitTimeSeconds ${WaitTimeSeconds}; Valid value should be an integer from 0 to 20 (seconds)`);
			}
			opts.WaitTimeSeconds = WaitTimeSeconds;
		}
		if (MaxNumberOfMessages && typeof MaxNumberOfMessages === 'number') {
			opts.MaxNumberOfMessages = MaxNumberOfMessages;
		}

		const {Messages} = await this.sqs.receiveMessage(opts).promise();
		return Messages;
	}

	/**
	 *
	 * @param {string} QueueUrl
	 * @param {string} ReceiptHandle An identifier associated with the act of receiving the message. A new receipt handle is returned every time you receive a message. When deleting a message, you provide the last received receipt handle to delete the message.
	 */
	async delete(QueueUrl, ReceiptHandle) {
		const opts = {
			QueueUrl,
			ReceiptHandle
		};

		await this.sqs.deleteMessage(opts).promise();
	}
}

