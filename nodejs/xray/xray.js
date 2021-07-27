const AWSXRay = require('aws-xray-sdk');
/**
 *
 * @param {ExpressApp} app
 * @param {string} segmentName required: 'Default segment name was not supplied.  Please provide a string.'
 */
exports.useXRay = (app, segmentName) => {
	app.use(AWSXRay.express.openSegment(segmentName));
};


/**
 *
 * @param {ExpressApp} app
 */
exports.expressError = (app) => {
	app.use(AWSXRay.express.closeSegment());
};
