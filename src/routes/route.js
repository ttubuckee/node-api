import express from "express";
import { getRouteInfo, getBeaconListInRoute } from "@/components/database";

const router = express.Router();

router.get('/info/:id',(req,res)=>{
	const { id } = req.params;
	getRouteInfo(id).then(res.send);
});
router.get('/list/:id',(req,res)=>{
	const { id } = req.params;
	getBeaconListInRoute(id).then(res.send);
});

export default router;
