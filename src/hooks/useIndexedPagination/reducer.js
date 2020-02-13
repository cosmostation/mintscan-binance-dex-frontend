import {nilCheck, _} from "src/lib/scripts";

export const initialState = {
	maxHeight: null,
	allData: [],
	//  0 -> first, 1 -> last showed on page, use these indexes to slice allData and send out
	index: [],
	params: {after: null},
	isFront: false,
	error: false,
	pageSize: null,
	isNoMore: false, //  reached end
};

export const INITIAL_LOAD = "INITIAL_LOAD"; //  initial load from 0
export const INITIAL_LOAD_QUERY = "INITIAL_LOAD_QUERY"; //  initial load from middle
export const EXTRA_LOAD_INIT = "EXTRA_LOAD_INIT"; //  get ready to load
export const EXTRA_LOAD = "EXTRA_LOAD"; //  load more
export const EXTRA_LOAD_FAIL = "EXTRA_LOAD_FAIL"; // load more but null
export const PAGE_CHANGE = "PAGE_CHANGE";
export const UPDATE_MAX_HEIGHT = "UPDATE_MAX_HEIGHT";
export const UPDATE_ISFRONT = "UPDATE_ISFRONT";
export const RESET = "RESET"; //  reset(to initial initial_load again

export default function(state, action) {
	console.log("reducer>>>", action.type);
	switch (action.type) {
		case INITIAL_LOAD: {
			const {data, pageSize, index} = action.payload;
			const [maxHeight, allData] = [data?.[0]?.height, data];
			if (nilCheck([maxHeight, allData])) return {...state, error: true};
			return {...state, maxHeight, allData, isFront: true, index, pageSize};
		}
		case INITIAL_LOAD_QUERY: {
			const {data, pageSize, index} = action.payload;
			const allData = data;
			if (_.isNil(allData)) return {...state, error: true};
			return {...state, allData, isFront: false, index, pageSize};
		}
		case EXTRA_LOAD_INIT: {
			return {...state, params: {after: action.payload.after}};
		}
		case EXTRA_LOAD: {
			if (action.payload.after) {
				return {
					...state,
					allData: [..._.reverse(action.payload.data), ...state.allData], //  reverse mutates array
					index: [state.index[0] + action.payload.data.length, state.index[1] + action.payload.data.length],
					params: {after: null},
					maxHeight: action.payload.data[0]?.height > state.maxHeight ? action.payload.data[0]?.height : state.maxHeight, //  so maxHeight is first of payload.data
					isFront: state.index[0] === 0 && action.payload.data.length < state.pageSize,
				};
			} else return {...state, allData: [...state.allData, ...action.payload.data], params: {after: null}};
		}
		case EXTRA_LOAD_FAIL: {
			if (state.params.after === true) return {...state, params: {after: null}, isFront: true};
			return {...state, params: {after: null}, isFront: false, isNoMore: true};
		}
		case PAGE_CHANGE: {
			if (action.payload.after === true) {
				if (state.index[0] === 0) return {...state, isFront: true};
				if (state.index[0] - state.pageSize <= 0) return {...state, index: [0, state.pageSize], isFront: true};
				return {...state, index: [state.index[0] - state.pageSize, state.index[1] - state.pageSize]};
			} else {
				//  not at front anymore
				return {...state, index: [state.index[0] + state.pageSize, state.index[1] + state.pageSize], isFront: false};
			}
		}
		case UPDATE_MAX_HEIGHT: {
			return {...state, maxHeight: action.payload};
		}
		case UPDATE_ISFRONT: {
			return {...state, isFront: true};
		}
		case RESET:
			return {...initialState};
		default:
			return {...initialState};
	}
}
