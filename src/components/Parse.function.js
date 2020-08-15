import Print from "@/components/Print.function";

const pad = (e, l = 4) => `${e}`.padStart(l, `0`);
const date = () => {
	const _ = new Date;
	const Y = _.getFullYear(), m = _.getMonth() + 1, d = _.getDate();
	const H = _.getHours(), i = _.getMinutes(), s = _.getSeconds();

	return `${Y}-${pad(m, 2)}-${pad(d, 2)} ${pad(H, 2)}:${pad(i, 2)}:${pad(s, 2)}`;
};

export function parseInOrder({year, semester, sbjtId_start, sbjtId_end, seat}) {
	Print(Print.type.MESSAGE, `${pad(sbjtId_start)} 부터 ${pad(sbjtId_end)} 까지 파싱을 시작합니다.`);
	Print(Print.type.MESSAGE, `파싱 시작시간 : ${date()}`);
}
