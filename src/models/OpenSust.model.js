import { fetch } from "@/components/Fetch.function";

export class OpenSust {
	constructor() {

	}
}

OpenSust.update = function() {
	fetch(`https://kupis.konkuk.ac.kr/sugang/acd/cour/time/SeoulTimetableInfo.jsp`).then(console.log);
}
