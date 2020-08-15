import request from "request";
var i = require('iconv').Iconv;

import { Iconv } from "iconv";



function _fetch(uri, try_count = 0) {
	return new Promise(resolve => {
		request(uri, (error, response, html) => {
			if(error) {
				console.warn(`ERROR`, error);
				if(try_count > 2) {
					throw new Error(`Network connection error`);
				}
				_fetch(uri, try_count + 1).then(resolve);
			}

			const iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');
			resolve(iconv.convert(html).toString(`UTF-8`));
		});
	});
}
export function fetch(uri) {
	return _fetch(uri);
}

