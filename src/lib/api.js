import axios from "axios";

import consts from "src/constants/consts";

const coinGeckoAPI = "https://api.coingecko.com/api/v3";

export const getMaxHeight = cancelToken => {
	return axios.get(`${consts.API_BASE}${consts.API.BLOCKLIST}?limit=0`, {cancelToken});
};

export const getBasicData = (id, currency, cancelToken) => {
	return axios.get(
		`${coinGeckoAPI}/simple/price?ids=${id}&vs_currencies=${currency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`,
		{cancelToken}
	);
};

export const getCoinData = (id, cancelToken) => {
	return axios.get(`${coinGeckoAPI}/coins/${id}?localization=false&tickers=false&community_data=false&sparkline=false&market_data=true&developer_data=false;`, {
		cancelToken,
	});
};

export const getMarketChartRange = (id, currency, from, to, cancelToken) => {
	return axios.get(`${coinGeckoAPI}/coins/binancecoin/market_chart/range?id=${id}&vs_currency=${currency}&from=${from}&to=${to}`, {cancelToken});
};
