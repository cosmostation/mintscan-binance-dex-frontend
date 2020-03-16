import {createAction, handleActions} from "redux-actions";
import {pender} from "redux-pender";
import * as api from "src/lib/api";
import {_} from "src/lib/scripts";

const [GET_ASSET_IMAGES] = ["GET_ASSET_IMAGES"];

export const getCryptoAssetImages = createAction(GET_ASSET_IMAGES, () => api.getAssetImages());

const initState = {
	images: {}
};

const handlers = {
	...pender({
		type: GET_ASSET_IMAGES,
		onSuccess: (state, action) => {
			const {imageList} = action.payload.data;
			return {...state, images: refineData(imageList)};
		},
		onFailure: state => {
			//  TODO : retry on fail
			return {...state}
		}
	})
}

const refineData = data => {
	const ret = {};
	_.each(data, v => ret[v.asset] = v.assetImg);
	return Object.freeze(ret);
};

export default handleActions(handlers, initState);