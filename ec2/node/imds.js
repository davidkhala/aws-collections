import {MetadataService} from '@aws-sdk/ec2-metadata-service';

export default class Metadata {
	constructor() {
		this.client = new MetadataService({ec2MetadataV1Disabled: true});
	}

	async request(path = '', options) {
		return await this.client.request(`/latest/meta-data/${path}`, options);
	}

	async region() {
		return await this.request('placement/region')
	}
	async userData(options){
		return await this.client.request('/latest/user-data',options)
	}

}