import {createAction, handleActions} from "redux-actions";
import {pender} from "redux-pender";
import * as api from "src/lib/api";
import {_, compareProperty} from "src/lib/scripts";
import {multiply} from "src/lib/Big";

const [GET_ASSETS] = ["GET_ASSETS"];

//  sorts assets in order of marketCap first, then by id if it is the same(0)
export const getCryptoAssets = createAction(GET_ASSETS, cancelToken => api.getAssets(cancelToken));

const initState = {
	assets: [],
};

const handlers = {
	...pender({
		type: GET_ASSETS,
		onSuccess: (state, action) => {
			if (!_.isArray(action.payload?.data?.assetInfoList)) return {...state};
			const data = _.map(action.payload.data.assetInfoList, v => ({...v, marketCap: Number(multiply(v?.price, v?.supply, 5))}));
			// console.log("assets>>", data);
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
