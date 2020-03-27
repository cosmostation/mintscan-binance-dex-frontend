import {_} from "src/lib/scripts";

export const initialState = {
	data: [],
	error: false,
	loading: [], //  array of bools specifying whether that url is fetching or not
	finished: true,
	errorMessage: "",
};

export const INIT = "INIT";
export const FETCHING_ALL = "FETCHING_ALL";
export const FETCHING_SELECTIVE = "FETCHING_SELECTIVE";
export const SUCCESS = "SUCCESS";
export const FINISHED = "FINISHED";
export const ERROR = "ERROR";

export default function(state, action) {
	switch (action.type) {
		case INIT: {
			return {...initialState};
		}
		//  turn all urls to fetching state
		case FETCHING_ALL: {
			return {...state, finished: false, loading: Array.from({length: state.loading.length}, () => true)};
		}
		//  turn selected urls to fetching state
		case FETCHING_SELECTIVE: {
			const {idxList} = action.payload;
			const newFetching = _.map(state.loading, (v, idx) => (_.includes(idxList, idx) ? true : v));
			console.log("newFetching>>>>", newFetching);
			return {...state, loading: newFetching, finished: false};
		}
		//  singular success
		case SUCCESS: {
			const {data, idx} = action.payload;
			if (state.finished) console.warn(`Logical error, success returned when fetching is finished[id:${idx}] - payload:`, action.payload);
			const newData = [...state.data];
			newData[idx] = data;

			const newFetching = [...state.loading];
			newFetching[idx] = false;

			return {...state, data: newData, loading: newFetching};
		}
		//  when all promises have finished(finally)
		case FINISHED: {
			return {...state, finished: true};
		}
		case ERROR: {
			return {...state, loading: false, error: true, data: null, errorMessage: action.payload.errorMessage};
		}
		default:
			return state;
	}
}
