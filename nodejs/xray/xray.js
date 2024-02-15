import AWSXRay from 'aws-xray-sdk';

/**
 *
 * @param {Express} app
 * @param {string} segmentName required: 'Default segment name was not supplied.  Please provide a string.'
 */
export function useXRay(app, segmentName) {
	app.use(AWSXRay.express.openSegment(segmentName));
}


/**
 *
 * @param {Express} app
 */
export function expressError(app) {
	app.use(AWSXRay.express.closeSegment());
}
