import {createAction, handleActions} from "redux-actions";
import {pender} from "redux-pender";
import * as api from "src/lib/api";

const GET_BASIC_DATA = "GET_BASIC_DATA";
const GET_STATUS = "GET_STATUS";

export const getCryptoBasicData = createAction(GET_BASIC_DATA, (id, currency, cancelToken) => api.getBasicData(id, currency, cancelToken));
export const getCryptoStatus = createAction(GET_STATUS, cancelToken => api.getStatus(cancelToken));

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
	}),
};

export default handleActions(handlers, initState);
