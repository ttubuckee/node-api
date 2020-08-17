import express from "express";
import multer from "multer";
import path from "path";
import { spawn } from "child_process";
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
		const { path: file_path } = req.file;
		const scriptPath = path.resolve(`${__dirname}/../surfMatching.py`);
		const resized_path = `${file_path}_resized`;
		imageResize(file_path, resized_path).then(_ => {
			const pythonProcess = spawn(`python`, [ scriptPath, file_path ]);
			pythonProcess.stdout.on(`data`, data => console.log(data));
		});

		res.send(`TESTING`);
	});

	return router;
}
