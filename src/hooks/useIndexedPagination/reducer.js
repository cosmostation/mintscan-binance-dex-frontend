import {nilCheck, _} from "src/lib/scripts";

export const initialState = {
	maxHeight: null,
	allData: [],
	//  0 -> first, 1 -> last showed on page, use these indexes to slice allData and send out
	index: [],
	params: {after: null},
	//  if true, query for most recent every 1 second
	isFront: false,
	error: false,
	pageSize: null,
	isNoMore: false,
};

export const INITIAL_LOAD = "INITIAL_LOAD"; //  initial load from 0
export const INITIAL_LOAD_QUERY = "INITIAL_LOAD_QUERY"; //  initial load from middle
export const EXTRA_LOAD_INIT = "EXTRA_LOAD_INIT"; //  get ready to load
export const EXTRA_LOAD = "EXTRA_LOAD"; //  load more
export const PAGE_CHANGE = "PAGE_CHANGE";
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
			if (action.payload.after)
				return {
					...state,
					allData: [..._.reverse(action.payload.data), ...state.allData],
					index: [state.index[0] + action.payload.data.length, state.index[1] + action.payload.data.length],
					params: {after: null},
				};
			else return {...state, allData: [...state.allData, ...action.payload.data], params: {after: null}};
		}
		case PAGE_CHANGE: {
			if (action.payload.after) {
				if (state.index[0] === 0) return state;
				if (state.index[0] - state.pageSize <= 0) return {...state, index: [0, state.pageSize]};
				return {...state, index: [state.index[0] - state.pageSize, state.index[1] - state.pageSize]};
			} else {
				//  not at front anymore
				if (state.isFront) return {...state, index: [state.index[0] + state.pageSize, state.index[1] + state.pageSize], isFront: false};
				return {...state, index: [state.index[0] + state.pageSize, state.index[1] + state.pageSize]};
			}
		}
		case RESET:
			return {...initialState};
		default:
			return {...initialState};
	}
}
