import express from "express";
import { getBeaconInfo, getBeaconImageInfo, getBeaconList } from "@/components/database";

const responseBeaconList = (req, res) => {
	getBeaconList().then(rows => {
		res.status(200);
		res.set(`Content-Type`, `application/json`);
		res.send(rows.map(row => {
			const { id, title, latitude, longitude } = row;
			return { id, title, latitude, longitude };
		}));
	});
};
const responseBeaconInfo = (req, res) => {
	const { id } = req.params;
	getBeaconInfo(id).then(([row]) => {
		if(row === undefined) {
			res.sendStatus(404);
			return;
		}

		getBeaconImageInfo(id).then(rows => {
			const image_list = rows.map(({ image_id }) => `${global.location_url}/image/${image_id}`);
			const beacon_info = {...row, image_list};

			res.status(200);
			res.set(`Content-Type`, `application/json`);
			res.send(beacon_info);
		});
	});
};
const validateStampImage = (req, res) => {
	const { id } = req.params;
	console.log({ id });
};

export default function() {
	const router = express.Router();
	router.get(`/`, responseBeaconList);
	router.get(`/:id`, responseBeaconInfo);
	router.post(`/:id`, validateStampImage);

	return router;
}
