import express from "express";
import multer from "multer";
import path from "path";
import { exec } from "child_process";
import { getImagePaths } from "@/components/database";
const sharp = require('sharp');

const imageResize = (file_path, resized_path) => {
	return new Promise(resolve => {
		sharp(file_path)
			.resize({ width: 480 })
			.toFormat('jpeg')
			.jpeg({quality: 100})
			.toFile(resized_path)
			.then(resolve);
	});
};

export default function() {
	const upload = multer({ dest: `${global.public_path}/matches/` });
	const router = new express.Router();
	
	router.post(`/`, upload.single(`image`), (req, res) => {
		res.set(`Content-Type`, `application/json`)
		console.log(req.body, req.file);
		const { path: file_path } = req.file;
		//const scriptPath = path.resolve(`${__dirname}/../../surfMatching.py`);
		const scriptPath = `${__dirname}\/..\/..\/surfMatching.py`;
		console.log({scriptPath});
		const resized_path = `${file_path}_resized`;
		imageResize(file_path, resized_path).then(_ => {
			exec(`python ${scriptPath} ${resized_path}`, (err, stdout, stderr) => {
				let result = `${stdout}`.trim();
				console.log({stderr});
				console.log({stdout});
				if(result.toUpperCase() === `FALSE`) {
					console.log("실패");
					res.send({ result: "FALSE"});
				} else { // 성공적으로 수행되었을 때
					// DB UPDATE 
					result = result.replace(/[.][a-z]*/g,'');
					console.log("성공 : "+result);
					res.send({ result: result});						}
			});
		});
	});
	router.post(`/compare`, upload.single(`image`), (req, res) => {
		const { beacon_id } = req.body;		
		const { path: file_path } = req.file;
		imageResize(file_path, `${global.public_path}/../data/${beacon_id}.jpg`).then(_ => {
			res.statusCode = 302;
			res.setHeader(`Location`, `${global.location_url}/image`);
			res.end();
			
			exec(`rm ${file_path}`);
		});
	});

	return router;
}

