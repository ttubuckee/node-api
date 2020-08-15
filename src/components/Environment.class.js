export const month_semester = [
	`B01011`, `B01011`, `B01011`, `B01011`,
	`B01014`, `B01014`,
	`B01012`, `B01012`, `B01012`, `B01012`,
	`B01015`, `B01015`,
];
export const env_fields = [`year`, `semester`, `sbjtId_start`];
export class Env {
	constructor() {
		const date = new Date;

		this.year = date.getFullYear();
		this.semester = month_semester[date.getMonth()];
		this.sbjtId_start = 0;
		this.sbjtId_end = 0;

		if([`B01011`, `B01012`].includes(this.semester)) {
			this.sbjtId_start = 1;
			this.sbjtId_end = 4999;
		} else {
			this.sbjtId_start = 5000;
			this.sbjtId_end = 9999;
		}

		process.argv.slice(2).forEach(e => {
			const [ key, value ] = e.split(`=`);
			if(env_fields.includes(key)) {
				this[key] = value;
			}
		});
	}
}
