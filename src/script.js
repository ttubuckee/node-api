/* global process */
/* global global */
require('dotenv').config();
import express from "express";
import path from "path";

import generateImageRoute from "./routes/image";
import generateBeaconRoute from "./routes/beacon";
import generateRouteRoute from "./routes/route";
import generateStampRoute from "./routes/stamp";

(_ => {
	const app = express();
	const { SERVER_PORT, SERVER_HOST } = process.env;
	global.public_path = path.resolve(`${__dirname}/../public_html`);
	global.location_url = `${SERVER_HOST}`;

	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(`/image`, generateImageRoute());
	app.use(`/beacon`, generateBeaconRoute());
	app.use(`/route`, generateRouteRoute());
	app.use(`/stamp`, generateStampRoute());

	app.listen(SERVER_PORT, _ => {
		console.log('server is running on port '+process.env.SERVER_PORT);
	});
})();
