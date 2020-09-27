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
			.toFile(resized_path)
			.then(resolve);
	});
};

export default function() {
	const upload = multer({ dest: `${global.public_path}/matches/` });
	const router = new express.Router();
	router.post(`/`, upload.single(`image`), (req, res) => {
		res.set(`Content-Type`, `application/json`)
		
		const { path: file_path } = req.file;
		const scriptPath = path.resolve(`${__dirname}/../../surfMatching.py`);
		const resized_path = `${file_path}_resized`;
		imageResize(file_path, resized_path).then(_ => {
			exec(`python ${scriptPath} ${resized_path}`, (err, stdout, stderr) => {
				const result = `${stdout}`.trim();
				if(result.toUpperCase() === `FALSE`) {
					console.log("실패");
					res.send({ result: false });
					/** DB UPDATE */
				} else {
					res.send({ result: false });
					result = result.replace(/[.]*[a-z]/,'')
					console.log("성공 : "+result);
					res.send({ result: result});
					//res.send({ result: false });
				}
			});
		});
	});

	return router;
}
