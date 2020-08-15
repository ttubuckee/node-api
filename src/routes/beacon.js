require('dotenv').config();
import express from "express";
import mysql from "mysql";

const router = express.Router();

router.get('info/:id',(req,res)=>{
	const connection = mysql.createConnection({
		host     : process.env.DB_HOST,
		user     : process.env.DB_USERNAME,
		password : process.env.DB_PASSWORD,
		database : process.env.DB_DATABASE
	});

	console.log('beacon_info request');
	connection.connect();
	const sql = 'SELECT * FROM beacon WHERE id ='+req.params.id;
	connection.query(sql,(err,rows,fields)=>{
		if(err)console.log(err);
		res.send(rows);
		connection.end();
	});
});

router.get('image/:id',(req,res)=>{
	const connection = mysql.createConnection({
		host     : process.env.DB_HOST,
		user     : process.env.DB_USERNAME,
		password : process.env.DB_PASSWORD,
		database : process.env.DB_DATABASE
	});

	console.log('beacon_image request');
	connection.connect();
	const sql = 'SELECT image_id FROM beacon_image WHERE beacon_id ='+req.params.id;
	let result = connection.query(sql,(err,rows,fields)=>{
		if(err)console.log(err);
		res.send(rows);
		connection.end();
	});
	console.log(result);
});

export default router;
