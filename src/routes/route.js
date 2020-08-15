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

router.get('/info/:id',(req,res)=>{
	const connection = mysql.createConnection({
		host     : process.env.DB_HOST,
		user     : process.env.DB_USERNAME,
		password : process.env.DB_PASSWORD,
		database : process.env.DB_DATABASE
	});

	console.log('route_info request');
	connection.connect();
	const sql = 'SELECT * FROM route WHERE id ='+req.params.id;
	connection.query(sql,(err,rows,fields)=>{
		if(err)console.log(err);
		res.send(rows);
		connection.end();
	});

});

router.get('/list/:id',(req,res)=>{
	const connection = mysql.createConnection({
		host     : process.env.DB_HOST,
		user     : process.env.DB_USERNAME,
		password : process.env.DB_PASSWORD,
		database : process.env.DB_DATABASE
	});

	console.log('route_list request');
	connection.connect();
	const sql = 'SELECT * FROM route_beacon WHERE route_id ='+req.params.id;
	connection.query(sql,(err,rows,fields)=>{
		if(err)console.log(err);
		res.send(rows);
		connection.end();
	});
});

export default router;
