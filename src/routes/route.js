import express from "express";
import { getAllRouteInfo, getBeaconListInRoute, getRouteInfo, updateUserLastRoute } from "@/components/database";

const responseRouteList = (req, res) => {
	getAllRouteInfo().catch((e)=>{
		//res.status(520);
		//res.set(`Content-Type`, `application/json`);

		//res.send(e);
		console.log(e);
	}).then(rows => {
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
			const beacon_list = rows.map(({id, title, description, longitude, latitude}, index) => ({id, title, description, longitude, latitude, index: index + 1}));
			res.send({...row, beacon_list});
		});
	});
};
const startTour = (req, res) => {
	const { id: route_id } = req.params;
	const { user_id } = req.body;

	updateUserLastRoute(user_id, route_id).then(_ => {
		res.set(`Content-Type`, `application/json`);
		res.send({ result: `complete` });
	});
};
const endTour = (req, res) => {
	const { id: route_id } = req.params;
	const { user_id } = req.body;

	updateUserLastRoute(user_id, -1).then(_ => {
		res.set(`Content-Type`, `application/json`);
		res.send({ result: `complete` });
	});
};

export default function() {
	const router = express.Router();
	router.get(`/`, responseRouteList);
	router.get(`/:id`, responseRouteInfo);
	router.post(`/:id`, startTour);
	router.post(`/:id/complete`, endTour);
	return router;
}
