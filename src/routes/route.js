import express from "express";
import { getAllRouteInfo, getBeaconListInRoute, getRouteInfo } from "@/components/database";

const responseRouteList = (req, res) => {
	getAllRouteInfo().then(rows => {
		res.status(200);
		res.set(`Content-Type`, `application/json`);

		res.send(rows);
	});
};
const responseRouteInfo = (req, res) => {
	const { id } = req.params;
	getRouteInfo(id).then(([ row ]) => {
		if(row === undefined) {
			res.sendStatus(404);
			return;
		}

		res.status(200);
		res.set(`Content-Type`, `application/json`);

		getBeaconListInRoute(id).then(rows => {
			const beacon_list = rows.map(({title, description, longitude, latitude}, index) => ({title, description, longitude, latitude, index: index + 1}));
			res.send({...row, beacon_list});
		});
	});
};

export default function() {
	const router = express.Router();
	router.get(`/`, responseRouteList);
	router.get(`/:id`, responseRouteInfo);

	return router;
}
