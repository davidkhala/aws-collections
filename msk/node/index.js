import KafkaManager from '@davidkhala/kafka/index.js';

import {generateAuthToken} from 'aws-msk-iam-sasl-signer-js';

export default class MSK extends KafkaManager {
	constructor(brokers) {
		const sasl = {
			mechanism: 'oauthbearer',
			oauthBearerProvider: async () => {
				const authTokenResponse = await generateAuthToken();
				return {
					value: authTokenResponse.token
				};
			}
		};
		super(brokers, {sasl});
	}
}