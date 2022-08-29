import AWSClass from '@davidkhala/aws-format';
import {
	SQSClient,
	SendMessageCommand,
	CreateQueueCommand,
	ListQueuesCommand,
	GetQueueUrlCommand,
	DeleteQueueCommand,
	PurgeQueueCommand,
	ReceiveMessageCommand,
	DeleteMessageCommand,
} from '@aws-sdk/client-sqs';

export class SQS extends AWSClass {

	constructor(param) {
		super(param);
		this.as(SQSClient);
	}

	async ping() {
		const result = await super.ping();
		// revert
		this.as(SQSClient);
		return result;
	}

	/**
	 *
	 * @param {string} QueueName
	 * @param {boolean} [isFifo] Designates a queue as FIFO, When you set this attribute, you must also provide the `MessageGroupId` for your messages explicitly.
	 * @return {Promise<String>} QueueUrl
	 */
	async create(QueueName, isFifo) {
		const opts = {
			QueueName,
			Attributes: {}
		};
		if (isFifo) {
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
		const {QueueUrl} = await this.sendCommand({QueueName}, GetQueueUrlCommand);
		return QueueUrl;
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


}

export class Message extends AWSClass {
	constructor(QueueUrl, param) {
		super(param);
		this.QueueUrl = QueueUrl;
		this.as(SQSClient);
	}

	static FromSQS(QueueUrl, instance) {
		return new Message(QueueUrl, Object.assign(instance.credentials, {region: instance.region}));
	}

	/**
	 * TODO MessageGroupId only work for fifo
	 * @param {string} message
	 * @param {number} [timeout] in milliseconds
	 * @return {Promise<SQS.SendMessageResult>}
	 */
	async send(message, timeout) {
		const opts = {
			MessageBody: message,
			QueueUrl: this.QueueUrl,
			DelaySeconds: timeout / 1000,
		};
		return await this.sendCommand(opts, SendMessageCommand);
	}

	/**
	 *
	 * @param {string} ReceiptHandle An identifier associated with the act of receiving the message. A new receipt handle is returned every time you receive a message. When deleting a message, you provide the last received receipt handle to delete the message.
	 */
	async delete(ReceiptHandle) {
		const opts = {
			QueueUrl: this.QueueUrl,
			ReceiptHandle
		};

		await this.sendCommand(opts, DeleteMessageCommand);
	}

	/**
	 *
	 * @param {number} numberOfMessages
	 * @param {number} timeout
	 * @return {Promise<SQS.Message[]>}
	 */
	async receive({numberOfMessages = 1, timeout = 0} = {}) {
		const opts = {QueueUrl: this.QueueUrl};
		if (timeout && typeof timeout === 'number') {
			opts.WaitTimeSeconds = timeout / 1000;
		}
		if (numberOfMessages && typeof numberOfMessages === 'number') {
			opts.MaxNumberOfMessages = numberOfMessages;
		}

		const {Messages} = await this.sendCommand(opts, ReceiveMessageCommand);
		return Messages;
	}

	/**
	 * Deletes the messages in a queue specified by the QueueURL parameter.
	 */
	async clean() {
		const {QueueUrl} = this;
		await this.sendCommand({QueueUrl}, PurgeQueueCommand);
	}

	/**
	 * Deletes the queue specified by the QueueUrl, regardless of the queue's contents.
	 */
	async destroy() {
		const {QueueUrl} = this;
		await this.sendCommand({QueueUrl}, DeleteQueueCommand);
		console.warn('You must wait 60 seconds after deleting a queue before you can create another queue with the same name.');
	}
}
