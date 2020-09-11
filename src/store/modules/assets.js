import {createAction, handleActions} from "redux-actions";
import {pender} from "redux-pender";
import * as api from "src/lib/api";
import {_, compareProperty} from "src/lib/scripts";
import {multiply} from "src/lib/Big";

const [GET_ASSETS, GET_BEP8, GET_ASSET_PRICES] = ["GET_ASSETS", "GET_BEP8", "UPDATE_ASSET_PRICES"];
//  sorts assets in order of marketCap first, then by id if it is the same(0)
export const getCryptoAssets = createAction(GET_ASSETS, cancelToken => api.getAssets(cancelToken));
export const getCryptoBep8 = createAction(GET_BEP8, cancelToken => api.getBep8Assets(cancelToken));
export const getCryptoAssetPrices = createAction(GET_ASSET_PRICES, cancelToken => api.getAssetPrices(cancelToken));

const initState = {
	assets: [],
	bep8: [],
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
		onFailure: state => {
			console.warn("get asset list fail");
			return {...state};
		},
	}),
	...pender({
		type: GET_ASSET_PRICES,
		onSuccess: (state, action) => {
			if (!_.isArray(action.payload?.data?.assetInfoList)) return {...state};
			const data = action.payload.data.assetInfoList;
			const assetObj = {};
			_.each(data, v => {
				_.assign(assetObj, {[v.name]: v.price});
			});
			const assetsCopy = [...state.assets];
			_.each(assetsCopy, v => {
				if (!_.isNil(assetObj[v.name]) && v.price !== assetObj[v.name]) _.assign(v, {price: assetObj[v.name]});
			});
			return {...state, assets: assetsCopy};
		},
		onFailure: state => {
			console.warn("get asset price list fail");
			return {...state};
		},
	}),
	...pender({
		type: GET_BEP8,
		onSuccess: (state, action) => {
			if (!_.isArray(action.payload.data?.assetInfoList)) return {...state};
			const data = _.map(action.payload.data.assetInfoList, v => ({...v, marketCap: Number(multiply(v?.price, v?.supply, 5))}));
			return {
				...state,
				bep8: data.sort(compareAsset),
			};
		},
	}),
};

const compareAsset = (a, b) => compareProperty(a, b, "marketCap");

export default handleActions(handlers, initState);
