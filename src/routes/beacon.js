require('dotenv').config();
import express from "express";
import mysql from "mysql";

import { getBeaconInfo, getBeaconImageInfo } from "@/components/database";

const router = express.Router();

router.get('info/:id',(req,res)=>{
	const { id } = req.params;
	getBeaconInfo(id).then(res.send);
});

router.get('image/:id',(req,res)=>{
	const { id } = req.params;
	getBeaconImageInfo(id).then(res.send);
});

export default router;
