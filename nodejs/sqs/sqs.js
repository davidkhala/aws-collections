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
	GetQueueAttributesCommand,
	QueueAttributeName
} from '@aws-sdk/client-sqs';

export class SQS extends AWSClass {

	constructor(...param) {
		super(...param);
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
			opts.Attributes.FifoQueue = true.toString();
			opts.Attributes.ContentBasedDeduplication = true.toString();
			opts.QueueName = `${QueueName}.fifo`;
		}

		const {QueueUrl} = await this.sendCommand(opts, CreateQueueCommand);


		return QueueUrl;
	}

	async createSync(...params) {
		const QueueUrl = await this.create(...params);
		const wait = async () => {
			const list = await this.list(SQS.nameFromURL(QueueUrl));
			if (!list.includes(QueueUrl)) {
				return await wait();
			}
		};
		await wait();
		return QueueUrl;
	}

	async get() {
		const {QueueUrl} = this;
		return await this.sendCommand({
			AttributeNames: [QueueAttributeName.All],
			QueueUrl,
		}, GetQueueAttributesCommand);
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
	async list(QueueNamePrefix) {
		const listResult = await this.sendCommand({QueueNamePrefix}, ListQueuesCommand);

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
		const {QueueUrl} = this;
		const opts = {
			MessageBody: message,
			QueueUrl,
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

	// get the queue name from QueueURL
	get name() {
		return SQS.nameFromURL(this.QueueUrl);
	}

	static nameFromURL(url) {
		// 	url template: https://sqs.us-east-2.amazonaws.com/123456789012/MyQueue
		return url.split('/')[4];
	}

	/**
	 * Deletes the queue specified by the QueueUrl, regardless of the queue's contents.
	 */
	async destroy() {
		// actual url is required by DeleteQueueCommand
		const {QueueUrl} = this;
		await this.sendCommand({QueueUrl}, DeleteQueueCommand);
		this.logger?.warn('You must wait 60 seconds after deleting a queue before you can create another queue with the same name.');
	}
	async destroySync(){
		await this.destroy()
		const wait = async () => {
			const list = await this.list(this.name);
			if (list?.includes(this.QueueUrl)) {
				return await wait();
			}
		};
		await wait();
	}

}
