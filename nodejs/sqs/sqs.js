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

	constructor(...param) {
		super(...param);
		delete this.logger
		super.as(SQSClient);
	}

	/**
	 *
	 * @param {string} QueueName
	 * @param {boolean} [isFifo] Designates a queue as FIFO
	 * @return {Promise<String>} QueueUrl
	 */
	async create(QueueName, isFifo) {
		const opts = {
			QueueName,
			Attributes: {}
		};
		if (isFifo) {
			opts.Attributes.FifoQueue = true;
			opts.Attributes.ContentBasedDeduplication = true;
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

	/**
	 *
	 * @param QueueUrl
	 * @param {true} [fifo]
	 */
	as(QueueUrl, fifo) {
		this.QueueUrl = QueueUrl;
		if (fifo) {
			this.asFIFO();
		}
	}

	asFIFO() {
		if (!this.isFIFO()) {
			this.QueueUrl = this.QueueUrl + '.fifo';
		}
	}

	isFIFO() {
		return this.QueueUrl.endsWith('.fifo');
	}

	/**
	 * @param {string} message
	 * @param {number} [timeout] in milliseconds
	 * @param [groupId] fifo only, invalid for standard queue
	 */
	async send(message, {timeout = 0, groupId = 'default'} = {}) {
		const opts = {
			MessageBody: message,
			QueueUrl: this.QueueUrl,
			DelaySeconds: timeout / 1000,
		};
		if (this.isFIFO()) {
			opts.MessageGroupId = groupId;
		}
		return await this.sendCommand(opts, SendMessageCommand);
	}

	/**
	 *
	 * @param {string} ReceiptHandle An identifier associated with the act of receiving the message.
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
		// actual url is required by DeleteQueueCommand
		const {QueueUrl} = this;
		await this.sendCommand({QueueUrl}, DeleteQueueCommand);
		this.logger && this.logger.warn('You must wait 60 seconds after deleting a queue before you can create another queue with the same name.');
	}

}
