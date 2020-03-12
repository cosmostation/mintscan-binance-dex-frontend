import {createAction, handleActions} from "redux-actions";
import {pender} from "redux-pender";
import * as api from "src/lib/api";
import {_, compareProperty} from "src/lib/scripts";
import {multiply} from "src/lib/Big";

const [GET_BASIC_DATA, GET_STATUS, GET_ASSETS] = ["GET_BASIC_DATA", "GET_STATUS", "GET_ASSETS"];

export const getCryptoBasicData = createAction(GET_BASIC_DATA, (id, currency, cancelToken) => api.getBasicData(id, currency, cancelToken));
export const getCryptoStatus = createAction(GET_STATUS, cancelToken => api.getStatus(cancelToken));

//  sorts assets in order of marketCap first, then by id if it is the same(0)
export const getCryptoAssets = createAction(GET_ASSETS, cancelToken => api.getAssets(cancelToken));

const initState = {
	status: {
		id: "binancecoin",
		currency: "",
		price: null,
		market_cap: null,
		vol_24h: null,
		change_24h: null,
		last_updated_at: null,
		blockTime: null,
	},
	assets: [],
};
const round = v => Math.round(100 * v) / 100;
const handlers = {
	...pender({
		type: GET_BASIC_DATA,
		onSuccess: (state, action) => {
			const {data} = action.payload;
			console.log("basicData>>", data);
			return {
				...state,
				status: {
					...state.status,
					currency: data.currency,
					price: round(data.current_price),
					market_cap: round(data.market_cap),
					vol_24h: round(data.total_volume),
					change_24h: round(data.percent_change_24h),
					last_updated_at: data.last_updated_at,
				},
			};
		},
		onFailure: state => {
			//  TODO : retry on fail
			return {...state};
		},
	}),
	...pender({
		type: GET_STATUS,
		onSuccess: (state, action) => {
			const {data} = action.payload;
			console.log("status>>", data);
			return {
				...state,
				status: {
					...state.status,
					blockTime: Math.round(data.block_time * 1000),
				},
			};
		},
		onFailure: state => {
			//  TODO : retry on fail
			return {...state};
		},
	}),
	...pender({
		type: GET_ASSETS,
		onSuccess: (state, action) => {
			if (!_.isArray(action.payload?.data?.assetInfoList)) return {...state};
			const data = _.map(action.payload.data.assetInfoList, v => ({...v, marketCap: Number(multiply(v?.price, v?.supply, 5))}));
			console.log("assets>>", data);
			//  using native array sort
			//  since the benchmark here https://www.npmjs.com/package/fast-sort#benchmark
			//  shows that in the case of a flat array with high randomization, arraySort is fastest at 100 items
			//  will adopt fast-sort if assets get higher than 1000
			return {
				...state,
				assets: data.sort(compareAsset),
			};
		},
	}),
};

const compareAsset = (a, b) => compareProperty(a, b, "marketCap");

export default handleActions(handlers, initState);
