const {KMS: KMSClass} = require('@aws-sdk/client-kms');
const {AWSClass} = require('@davidkhala/aws-format');
/**
 * @enum
 */
const MessageType = {
	raw: 'RAW', digest: 'DIGEST'
};
/**
 * @enum
 */
const SigningAlgorithm = {
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


class KMS extends AWSClass {
	/**
	 *
	 * @param {string} KeyId
	 * @param {string} region
	 */
	constructor(KeyId, region = 'ap-east-1') {
		const {secretAccessKey, accessKeyId} = process.env;
		super({secretAccessKey, accessKeyId});
		const {credentials} = this;
		const kms = new KMSClass({credentials, region});
		Object.assign(this, {kms, KeyId});
	}

	async connect() {
		const {kms, KeyId} = this;
		const {KeyMetadata} = await kms.describeKey({KeyId});
		const {SigningAlgorithms: [signingAlgorithm]} = KeyMetadata;
		this.SigningAlgorithm = signingAlgorithm;
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
	 * @return {Promise<true>}
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

	disconnect() {
		this.kms.destroy();
	}
}

module.exports = {
	KMS, MessageType, SigningAlgorithm
};