/*
	이 서버의 역할

	Prefix

	- /beacon
		/info/:id  -> 해당 id를 가진 비콘의 정보를 JSON 형식으로 보내준다.
		/image/:id -> 해당 id를 가진 비콘의 이미지 정보를 보내준다.
	- /route
		/info/:id  -> 해당 id를 가진 경로의 정보를 JSON 형식으로 보내준다.
		/list/:id  -> 해당 id를 가진 경로의 비콘 리스트를 JSON 형식으로 보내준다.


 */
require('dotenv').config();

import express from "express";
import mysql from "mysql";
import beacon from './routes/beacon';
import route from './routes/route';

const app = express();
const connection = mysql.createConnection({
	host     : process.env.DB_HOST,
	user     : process.env.DB_USERNAME,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_DATABASE
});

app.use('/beacon',beacon);
app.use('/route',route);

app.listen(process.env.SERVER_PORT,(res,req)=>{
	console.log('server is running on port '+process.env.SERVER_PORT);
});


