export const initialState = {
	allData: [],
	index: [],
	isNoMore: false,
	pageSize: null,
	error: false,
};

export const INITIAL_LOAD = "INITIAL_LOAD";
export const EXTRA_LOAD = "EXTRA_LOAD"; //  load more
export const PAGE_CHANGE = "PAGE_CHANGE";
export const RESET = "RESET"; //  reset(to initial initial_load again
