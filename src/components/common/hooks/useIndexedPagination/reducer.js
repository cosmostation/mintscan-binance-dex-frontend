import {_, nilCheck} from "src/lib/scripts";

export const initialState = {
	maxHeight: null,
	curHeight: null,
	allData: [],
	pageData: [],
	params: {height: null, after: true},
	isFront: false,
	error: false,
};

export const INITIAL_LOAD = "INITIAL_LOAD";
export const INITIAL_LOAD_QUERY = "INITIAL_LOAD_QUERY";
export const EXTRA_LOAD_AFTER = "EXTRA_LOAD_AFTER";
export const EXTRA_LOAD_BEFORE = "EXTRA_LOAD_BEFORE";
export const RESET = "RESET";

export default function(state, action) {
	switch (action.type) {
		case INITIAL_LOAD:
			const {data, pageSize} = action.payload;
			const [maxHeight, allData] = [data?.[0]?.height, data];
			const pageData = _.isArray(data) ? _.slice(data, 0, pageSize) : null;
			if (nilCheck([maxHeight, allData, pageData])) return {...state, error: true};
			return {...state, maxHeight, allData, isFront: true, curHeight: maxHeight, pageData};
		case INITIAL_LOAD_QUERY:
		case EXTRA_LOAD_AFTER:
		case EXTRA_LOAD_BEFORE:
		case RESET:
			return {...initialState};
		default:
			throw new Error(`Undefined action type: ${action.type}`);
	}
}
