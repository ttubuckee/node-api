require(`dotenv`).config();
import { Env } from "@/components/Environment.class";
import { printLogo } from "@/components/Print.function";
import { parseInOrder } from "@/components/Parse.function";
import { OpenSust } from "@/models/OpenSust.model";

(function() {
	global.env = new Env;

	// printLogo();
	// parseInOrder(global.env);

	OpenSust.update();
})();
