import {useXRay, expressError} from '../xray.js';
import {run} from "@davidkhala/nodeutils/baseApp.js";

const {app} = run(5000);
useXRay(app, 'test');
app.get('/', (req, res) => {
	res.status(200);
	res.json({message: 'OK'});
});
app.get('/panic', (req, res) => {
	throw Error('panic');
});
expressError(app);

