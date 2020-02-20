import {createAction, handleActions} from "redux-actions";
import {pender} from "redux-pender";
import * as api from "src/lib/api";
import {_} from "src/lib/scripts";

const GET_BASIC_DATA = "GET_BASIC_DATA";
const GET_DATA = "GET_DATA";

export const getCryptoBasicData = createAction(GET_BASIC_DATA, (id, currency, cancelToken) => api.getBasicData(id, currency, cancelToken));
export const getCryptoData = createAction(GET_DATA, (id, cancelToken) => api.getCoinData(id, cancelToken));

const initState = {
	status: {
		id: "binancecoin",
		currency: "",
		price: null,
		market_cap: null,
		vol_24h: null,
		change_24h: null,
		last_updated_at: null,
	},
};
const round = v => Math.round(100 * v) / 100;
const handlers = {
	...pender({
		type: GET_BASIC_DATA,
		onSuccess: (state, action) => {
			const data = action.payload.data[_.keys(action.payload.data)[0]];
			const keys = _.keys(data);
			return {
				...state,
				status: {
					...state.status,
					currency: keys[0],
					price: round(data[keys[0]]),
					market_cap: round(data[keys[1]]),
					vol_24h: round(data[keys[2]]),
					change_24h: round(data[keys[3]]),
					last_updated_at: data.last_updated_at,
				},
			};
		},
		onFailure: state => {
			return {...state};
		},
	}),
};

export default handleActions(handlers, initState);
