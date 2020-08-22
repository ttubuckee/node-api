import express from "express";
import { getBeaconInfo, getBeaconImageInfo } from "@/components/database";

const responseBeaconList = (req, res) => {
	res.send(`비콘 전체 목록이 필요하다면 만들겠습니다! 대현님 ^^7`);
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

};

export default function() {
	const router = express.Router();
	router.get(`/`, responseBeaconList);
	router.get(`/:id`, responseBeaconInfo);
	router.post(`/:id`);

	return router;
}
