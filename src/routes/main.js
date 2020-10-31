import express from "express";
import cheerio from "cheerio";
import request from "request";
import { getStampRatio, getBeaconCnt } from "@/components/database";

/**
 * json
 * 
 * stamp_status : 현재까지 획득한 스탬프 개수
 * 
 * stamp_achievement : 스탬프 획득 퍼센트
 *
 */

const responseMainPage = (req,res) => {
	const { id } = req.params;
	const json = {};

	//const p1 = getStampStatus;
	//const p2 = getBeaconCnt;

	getStampRatio(id).then(val=>{
		json["stamp_status"] = val.map(e=>e.beacon_id);
		getBeaconCnt().then(val=>{
			const total = val[0].cnt;
			const cnt = json["stamp_status"].length;

			json["stamp_achievement"] = cnt/total*100;

			res.status(200);
			res.set(`Content-Type`, `application/json`);
			res.send(json);
		});
	});
}

/**
 *json
 *
 * weather : 현재 날씨 
 *
 * dust : 현재 미세먼지 상태
 *
 */
const responseWeather = (req,res)=>{
	request('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%ED%99%94%EC%96%91%EB%8F%99+%EB%82%A0%EC%94%A8',(err,response,body)=>{
		const $ = cheerio.load(body);
		const weather = $(`#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > ul > li:nth-child(1) > p`).text();
		const dust = $('#main_pack > section.sc_new.cs_weather._weather > div > div.api_cs_wrap > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.sub_info > div > dl > dd:nth-child(2) > span.num').text().split(/(㎍\/㎥)/);
		//const dust = $(`#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.sub_info > div > dl > dd:nth-child(2)`).text().split(/(㎍\/㎥)/);

		res.status(200);
		res.set(`Content-Type`,`application/json`);
		res.send({
			'weather' : weather,
			//'dust' : `${dust[0]}${dust[1]} ${dust[2]}`
			'dust' : dust[0]+dust[1]+' '+dust[2]
		});
	});
}
export default function() {
	const router = express.Router();
	router.get(`/weather`,responseWeather);
	router.get(`/:id`, responseMainPage);
	return router;
}
