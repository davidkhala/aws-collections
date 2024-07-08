import KafkaManager from '@davidkhala/kafka/index.js';
import {generateAuthToken} from 'aws-msk-iam-sasl-signer-js';

export default class MSK extends KafkaManager {
	/**
	 *
	 * @param {string[]} brokers
	 * @param {string} region must provide
	 */
	constructor(brokers, region) {
		const sasl = {
			mechanism: 'oauthbearer',
			oauthBearerProvider: async () => {
				const authTokenResponse = await generateAuthToken({region});
				return {
					value: authTokenResponse.token
				};
			}
		};
		super(brokers, {sasl});
	}
}