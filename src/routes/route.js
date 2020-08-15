import express from "express";
import { getRouteInfo, getBeaconListInRoute } from "@/components/database";

const router = express.Router();

router.get('/info/:id',(req,res)=>{
	const { id } = req.params;
	getRouteInfo(id).then(e => res.send(e));
});
router.get('/list/:id',(req,res)=>{
	console.log(req);
	const { id } = req.params;
	getBeaconListInRoute(id).then(e => res.send(e));
});

export default router;
