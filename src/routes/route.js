require('dotenv').config();
import express from "express";
import mysql from "mysql";

const router = express.Router();
const connection = mysql.createConnection({
	host     : process.env.DB_HOST,
	user     : process.env.DB_USERNAME,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_DATABASE
});

router.get('/list/:id',(req,res)=>{
	console.log('route request');
	connection.connect();
	const sql = 'SELECT * FROM route_beacon WHERE route_id ='+req.params.id;
	connection.query(sql,(err,rows,fields)=>{
		if(err)console.log(err);
		console.log('rows: ',rows,' fields: ',fields);
		res.send(rows);
	});
	connection.end();
});

export default router;
