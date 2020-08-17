/* global process */
/* global global */
/*
	이 서버의 역할

	Prefix

	- /beacon
		/info/:id  -> 해당 id를 가진 비콘의 정보를 JSON 형식으로 보내준다.
		/image/:id -> 해당 id를 가진 비콘의 이미지 정보를 보내준다.
	- /route
		/info/:id  -> 해당 id를 가진 경로의 정보를 JSON 형식으로 보내준다.
		/list/:id  -> 해당 id를 가진 경로의 비콘 리스트를 JSON 형식으로 보내준다.


 */

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

	app.use(`/image`, generateImageRoute());
	app.use(`/beacon`, generateBeaconRoute());
	app.use(`/route`, generateRouteRoute());
	app.use(`/stamp`, generateStampRoute());

	app.listen(SERVER_PORT, _ => {
		console.log('server is running on port '+process.env.SERVER_PORT);
	});
})();
