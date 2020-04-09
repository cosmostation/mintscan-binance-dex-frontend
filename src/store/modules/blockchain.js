import consts from "src/constants/consts";
import {createAction, handleActions} from "redux-actions";
import {pender} from "redux-pender";
import * as api from "src/lib/api";
import {_, compareProperty} from "src/lib/scripts";
import {multiply} from "src/lib/Big";
import txTypes from "src/constants/txTypes";

const [GET_BASIC_DATA, GET_STATUS, GET_ASSETS, GET_FEES, GET_VALIDATORS, GET_FASTEST_NODE] = [
	"GET_BASIC_DATA",
	"GET_STATUS",
	"GET_ASSETS",
	"GET_FEES",
	"GET_VALIDATORS",
	"GET_FASTEST_NODE",
];

export const getCyptoAcceleratedNode = createAction(GET_FASTEST_NODE, () => api.getFastestNode(consts.API_BINANCE_ACCELERATED));
export const getCryptoBasicData = createAction(GET_BASIC_DATA, (id, currency, cancelToken) => api.getBasicData(id, currency, cancelToken));
export const getCryptoStatus = createAction(GET_STATUS, cancelToken => api.getStatus(cancelToken));
export const getCryptoFees = createAction(GET_FEES, cancelToken => api.getFees(cancelToken));
export const getCryptoValidators = createAction(GET_VALIDATORS, cancelToken => api.getValidators(cancelToken));

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
	acceleratedNode: consts.API_BINANCE_ACCELERATED[0],
	validators: [],
	fees: [],
	txFees: [],
};
const round = v => Math.round(100 * v) / 100;

// [Ack, PartialFill, IocNoFill, FullyFill, Canceled, Expired, FailedBlocking, FailedMatching, IocExpire]

const handlers = {
	...pender({
		type: GET_FASTEST_NODE,
		onSuccess: (state, action) => {
			console.log(action.payload);
			return {...state, acceleratedNode: action.payload};
		},
		onFailure: state => ({...state}),
	}),
	...pender({
		type: GET_FEES,
		onSuccess: (state, action) => {
			const {data} = action.payload;
			const fees = {};
			const txFees = {};
			_.each(data, v => {
				if (_.keys(v)[0] === "msg_type") assignFee(fees, v);
				else {
					if (_.isArray(v?.dex_fee_fields)) {
						_.each(v.dex_fee_fields, dexV => _.assign(txFees, {[dexV.fee_name]: dexV.fee_value}));
					} else {
						_.assign(fees, {
							"cosmos-sdk/Send": {fee: v.fixed_fee_params.fee, feeFor: v.fixed_fee_params.fee_for},
							"cosmos-sdk/MultiSend": {fee: v.multi_transfer_fee},
						});
					}
				}
			});
			console.log(txFees);
			return {
				...state,
				fees,
				txFees,
			};
		},
		onFailure: state => {
			return {...state};
		},
	}),
	...pender({
		type: GET_VALIDATORS,
		onSuccess: (state, action) => {
			const {data} = action.payload;
			const validators = {};
			_.each(data, v => {
				if (!v?.moniker) return;
				_.assign(validators, {
					[v.moniker]: {
						accountAddr: v.account_address,
						operatorAddr: v.operator_address,
						consensusAddr: v.consensus_address,
					},
				});
			});
			return {
				...state,
				validators,
			};
		},
		onFailure: state => {
			return {...state};
		},
	}),
	...pender({
		type: GET_BASIC_DATA,
		onSuccess: (state, action) => {
			const {data} = action.payload;
			// console.log("basicData>>", data);
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
			// console.log("status>>", data);
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

const flatTxTypes = Object.freeze({
	...txTypes.COSMOS,
	...txTypes.DEX,
	...txTypes.TOKENS,
	...txTypes.MISC,
});

const assignFee = (obj, fee) => {
	const target = _.camelCase(fee.msg_type).toLowerCase();
	// console.log(target);
	// console.log(flatTxTypes);
	const foundProperty = _.find(_.keys(flatTxTypes), property => {
		return _.includes(_.camelCase(property).toLowerCase(), target) || _.includes(_.camelCase(flatTxTypes[property]).toLowerCase(), target);
	});
	_.assign(obj, {[flatTxTypes[foundProperty]]: {fee: fee.fee, feeFor: fee.fee_for}});
};

const compareAsset = (a, b) => compareProperty(a, b, "marketCap");

export default handleActions(handlers, initState);
