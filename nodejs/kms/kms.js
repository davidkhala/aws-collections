import {KMS} from '@aws-sdk/client-kms';
import {AWSClass} from '@davidkhala/aws-format';

/**
 * @enum
 */
export const MessageType = {
	raw: 'RAW', digest: 'DIGEST'
};
/**
 * @enum
 */
export const SigningAlgorithm = {
	RSASSA_PSS_SHA_256: 'RSASSA_PSS_SHA_256',
	RSASSA_PSS_SHA_384: 'RSASSA_PSS_SHA_384',
	RSASSA_PSS_SHA_512: 'RSASSA_PSS_SHA_512',

	RSASSA_PKCS1_V1_5_SHA_256: 'RSASSA_PKCS1_V1_5_SHA_256',
	RSASSA_PKCS1_V1_5_SHA_384: 'RSASSA_PKCS1_V1_5_SHA_384',
	RSASSA_PKCS1_V1_5_SHA_512: 'RSASSA_PKCS1_V1_5_SHA_512',

	ECDSA_SHA_256: 'ECDSA_SHA_256',
	ECDSA_SHA_384: 'ECDSA_SHA_384',
	ECDSA_SHA_512: 'ECDSA_SHA_512',
};


export class AWSKMS extends AWSClass {

	constructor() {
		super(process.env);
		this.buildClient(KMS);
	}


	/**
	 * @return {Promise<KeyListEntry[]>}
	 */
	async list() {
		const {client} = this;
		const {Keys} = await client.listKeys({});
		return Keys;
	}

	/**
	 *
	 * @param {string} KeyId key id of aws KMS
	 */
	async as(KeyId) {
		const {client} = this;
		const {KeyMetadata} = await client.describeKey({KeyId});

		if (Array.isArray(KeyMetadata.SigningAlgorithms)) {
			this.SigningAlgorithm = KeyMetadata.SigningAlgorithms[0];
		}

		this.KeyId = KeyId;
		return KeyMetadata;
	}

	/**
	 *
	 * @param {string} message
	 * @param {MessageType} [messageType]
	 * @param {SigningAlgorithm} [signingAlgorithm]
	 * @return {SignResponse}
	 */
	async sign(message, messageType = MessageType.raw, signingAlgorithm = this.SigningAlgorithm) {
		const {kms, KeyId} = this;

		const params = {
			KeyId,
			Message: Buffer.from(message),
			MessageType: messageType,
			SigningAlgorithm: signingAlgorithm
		};
		const {Signature} = await kms.sign(params);

		return Signature;
	}

	/**
	 *
	 * @return {Promise<boolean>}
	 */
	async verify(message, signature, messageType = MessageType.raw, signingAlgorithm = this.SigningAlgorithm) {
		const {kms, KeyId} = this;

		const {SignatureValid} = await kms.verify({
			KeyId,
			Message: Buffer.from(message),
			Signature: signature,
			MessageType: messageType,
			SigningAlgorithm: signingAlgorithm,
		});
		return SignatureValid;
	}

	async create({KeyUsage, KeySpec} = {}) {
		const {KeyMetadata} = await this.client.createKey({KeySpec, KeyUsage});
		// clean undefined
		for (const [entry, value] of Object.entries(KeyMetadata)) {
			if (!value) {
				delete KeyMetadata[entry];
			}
		}
		return KeyMetadata;
	}

	async remove(KeyId, PendingWindowInDays = 7) {

		if (PendingWindowInDays < 7) {
			PendingWindowInDays = 7;
		}
		const {DeletionDate, KeyId: Arn} = await this.client.scheduleKeyDeletion({
			KeyId,
			PendingWindowInDays
		});
		return {DeletionDate, Arn};
	}

	disconnect() {
		super.disconnect();
		delete this.SigningAlgorithm;
		delete this.KeyId;
	}
}
