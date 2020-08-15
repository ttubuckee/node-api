require('dotenv').config();
import express from "express";

import { getBeaconInfo, getBeaconImageInfo } from "@/components/database";

const router = express.Router();

router.get('/info/:id',(req,res)=>{
	const { id } = req.params;
	getBeaconInfo(id).then(e => res.send(e));
});

router.get('/image/:id',(req,res)=>{
	const { id } = req.params;
	getBeaconImageInfo(id).then(e => res.send(e));
});

export default router;
