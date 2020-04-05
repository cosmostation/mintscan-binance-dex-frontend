import {_, empty} from "src/lib/scripts";
import consts from "src/constants/consts";

export const initialState = {
	maxIndex: null,
	allData: [],
	//  0 -> first, 1 -> last showed on page, use these indexes to slice allData and send out
	index: [],
	params: {after: null},
	isFront: null,
	error: false,
	pageSize: null,
	reset: 0, //  1 -> front, 2 -> back
	isNoMore: false, //  reached end
};

export const INITIAL_LOAD = "INITIAL_LOAD"; //  initial load from 0
export const INITIAL_LOAD_QUERY = "INITIAL_LOAD_QUERY"; //  initial load from middle
export const EXTRA_LOAD_INIT = "EXTRA_LOAD_INIT"; //  get ready to load
export const EXTRA_LOAD = "EXTRA_LOAD"; //  load more
export const EXTRA_LOAD_FAIL = "EXTRA_LOAD_FAIL"; // load more but null
export const RECENT_DATA_LOAD = "RECENT_DATA_LOAD"; //  fetch real-time
export const PAGE_CHANGE = "PAGE_CHANGE";
export const UPDATE_MAX_HEIGHT = "UPDATE_MAX_HEIGHT";
export const UPDATE_ISFRONT = "UPDATE_ISFRONT"; //  indicator whether the current page is the front
export const RESET = "RESET"; //  reset(to initial initial_load again

export default function(state, action) {
	// console.log("reducer>>>", action.type, _.cloneDeep(state));
	switch (action.type) {
		case INITIAL_LOAD: {
			const {data, pageSize, index, maxIndex} = action.payload;
			if (empty(data)) return {...state, error: true};
			return {...state, maxIndex, allData: data, isFront: true, index, pageSize, reset: 0};
		}
		case INITIAL_LOAD_QUERY: {
			const {data, pageSize, index, maxIndex} = action.payload;
			const allData = data;
			if (_.isNil(allData)) return {...state, error: true};
			return {...state, allData, isFront: false, index, pageSize, maxIndex, reset: 0, isNoMore: state.isNoMore === false && state.reset === 2};
		}
		case EXTRA_LOAD_INIT: {
			return {...state, params: {after: action.payload.after}};
		}
		case EXTRA_LOAD: {
			const defaultParams = {params: {after: null}, maxIndex: action.payload.maxIndex};
			if (state.params.after === false && action.payload.data.length < state.pageSize * (consts.NUM.SPARE_PAGE_CNT + 1)) defaultParams.isNoMore = true;
			if (!action.payload.loading) {
				_.assign(defaultParams, {isFront: state.index[0] === 0 && action.payload.data.length < state.pageSize});
			}
			if (action.payload.after) {
				return {
					...state,
					allData: [..._.reverse(action.payload.data), ...state.allData], //  reverse mutates array
					index: [state.index[0] + action.payload.data.length, state.index[1] + action.payload.data.length],
					...defaultParams,
				};
			} else {
				return {
					...state,
					allData: [...state.allData, ...action.payload.data],
					...defaultParams,
				};
			}
		}
		case EXTRA_LOAD_FAIL: {
			if (state.params.after === true) return {...state, params: {after: null}, isFront: true};
			return {...state, params: {after: null}, isFront: false, isNoMore: true};
		}
		case RECENT_DATA_LOAD: {
			return {
				...state,
				params: {after: null},
				allData: [..._.reverse(action.payload.data), ...state.allData],
				maxIndex: action.payload.maxIndex,
				index: [0, state.pageSize - 1],
			};
		}
		case PAGE_CHANGE: {
			if (action.payload.after === true) {
				if (state.index[0] === 0) return {...state, isFront: true};
				if (state.index[0] - state.pageSize <= 0) return {...state, index: [0, state.pageSize - 1], isFront: true};
				return {...state, index: [state.index[0] - state.pageSize, state.index[1] - state.pageSize]};
			} else {
				//  not at front anymore
				return {...state, index: [state.index[0] + state.pageSize, state.index[1] + state.pageSize], isFront: false};
			}
		}
		case UPDATE_MAX_HEIGHT: {
			return {...state, maxIndex: action.payload};
		}
		case UPDATE_ISFRONT: {
			return {...state, isFront: true};
		}
		case RESET: {
			return {...initialState, reset: action.payload.reset};
		}
		default:
			return {...initialState};
	}
}
