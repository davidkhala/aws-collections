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
	/**
	 *
	 * @param {string} KeyId key id of aws KMS
	 */
	constructor(KeyId) {
		super(process.env);
		this.buildClient(KMS);
		this.KeyId = KeyId;
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

}
