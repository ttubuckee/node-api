import fs from "fs";
import { exec } from "child_process";

(_ => {
	fs.readFile(`./PID`, `utf8`, (_, pid) => {
		console.log({pid});
		exec(`kill -9 ${pid}`, _ => {});
	});
})();