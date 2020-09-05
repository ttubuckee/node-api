import express from "express";
import { getStampStatus, getBeaconCnt } from "@/components/database";

/**
 *
 * stamp_status : 현재까지 획득한 스탬프 개수
 * 
 * stamp_achievement : 스탬프 획득 퍼센트
 *
 */

const responseMainPage = (req,res) => {
	const { id } = req.params;
	const json = {};
	
	const p1 = getStampStatus;
	const p2 = getBeaconCnt;

	p1(id).then(val=>{
		json["stamp_status"] = val.map(e=>e.beacon_id);
		console.log(json["stamp_status"]);
		p2().then(val=>{
			const total = val[0].cnt;
			const cnt = json["stamp_status"].length;
			json["stamp_achievement"] = cnt/total*100;
			
			res.status(200);
			res.set(`Content-Type`, `application/json`);
			res.send(json);
			console.log(json);
		});
	});
}
const test = (req,res)=>{
	console.log("testing");
};
export default function() {
	const router = express.Router();
	router.get(`/`,test);
	router.get(`/:id`, responseMainPage);
	return router;
}
