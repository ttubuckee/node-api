/* global global */
import express from "express";
import fs from "fs";
import multer from "multer";
import { insertImage, getImageInfo, getAllImageInfo } from "@/components/database";

const responseImageUploadForm = (_, res) => {
	const htmlPath = `${global.public_path}/image_upload.html`;
	fs.readFile(htmlPath, `utf8`, (_, html) => {
		res.status(200);
		res.set(`Content-Type`, `text/html`);
		
		getAllImageInfo().then(rows => {
			const imgEls = [...rows]
				.map(({ id, title }) => `<li><img src="${global.location_url}/image/${id}" /><p>(${id}) ${title}</p></li>`)
				.join(``);

			res.end(html.replace(`{{image_list}}`, imgEls), `utf-8`);
		});
	});
};
const responseImage = (req, res) => {
	const { id } = req.params;
	getImageInfo(id).then(([row]) => {
		if(row === undefined) {
			res.sendStatus(404);
			return;
		}

		const { mimetype, path } = row;
		const file = fs.createReadStream(path);
		file.on(`open`, _ => {
			res.set(`Content-Type`, mimetype);
			file.pipe(res);
		});
		file.on(`error`, _ => {
			res.sendStatus(404);
		});
	});
};
const uploadImage = (req, res) => {
	const { originalname, mimetype, path } = req.file;
	insertImage({ originalname, mimetype, path }).then(_ => {
		console.log(req.file);
		res.send(`Upload complete!`);
	});
};

export default function() {
	const upload = multer({ dest: `${global.public_path}/uploads/` });
	const router = express.Router();

	router.get(`/`, responseImageUploadForm);
	router.get(`/:id`, responseImage);
	router.post(`/`, upload.single(`user_file`), uploadImage);

	return router;
}
