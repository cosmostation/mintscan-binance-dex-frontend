import {useEffect, useCallback, useReducer} from "react";
import {useGet} from "restful-react";

import empty from "is-empty";
import useHistoryByCase from "src/components/common/hooks/useHistoryByCase";

import {nilCheck, _} from "src/lib/scripts";

//  allData -> blocks where heights are in descending order

//  query params loadMore
//  after: true -> get heights higher than said height(in ascending order)
//  after: false -> get heights lower than said height(in descending order)
/*
{
	height: int,
	after: boolean
}
 */
//  indexState
/*
[
	firstIndex(starting at 1)
	lastIndex
]
 */

const getQueryParams = (arr, after, baseProperty, path, limit) => {
	const baseHeight = after ? arr[0]?.[baseProperty] : arr[arr.length - 1]?.[baseProperty];
	if (_.isNil(baseHeight)) return throw new Error("First or last element in array does not have baseProperty set");
	return `${path}?limit=${limit}&${after ? "after" : "before"}=${baseHeight}`;
};

const initialState = {
	maxHeight: null,
	curHeight: null,
	allData: [],
	pageData: [],
	params: {height: null, after: true},
	isFront: false,
	error: false,
};

export default function(path, pageSize = 20, initialHeight = 0, baseProperty = "height", limit = 60, resolve = undefined, updateQuery = "") {
	const {data, loading, error, refetch} = useGet({
		path: initialHeight === 0 ? `${path}?limit=${limit}` : `${path}?limit=${limit}&`,
		resolve: resolve,
	});
	const [state, dispatch] = useReducer(reducer, initialState, () => initialState);
	const history = useHistoryByCase(updateQuery !== "");

	//  when new data arrives, append to original data
	useEffect(() => {
		if (!_.isNil(error) || _.isNil(data)) return;
		//  filter data and append to allData accordingly
		//  case, initial load
		if (empty(state.allData)) {
			//  initial load only occurs when initialHeight is set
			if (initialHeight === 0) return dispatch({type: INITIAL_LOAD, payload: {data, pageSize}});
			else return dispatch({type: INITIAL_LOAD_QUERY, payload: {data, initialHeight, pageSize}});
		}
		//  recalculate pager
		console.log("pagination info>>>>>>>>", data);
	}, [data]);

	//  trigger refetch when currentPage changes, trigger automatic refetch every 0.9 seconds if page is 1
	useEffect(() => {
		if (!_.isNil(error) || state.curHeight === null) return;
		//  check whether refetch is needed
		//  if needed calculate the height to be queried by checking the last / first entry of allData
	}, [state.curHeight]);

	useEffect(() => {
		if (history === null) return;
		//  if updateQuery is defined, use history to update location etc.
	}, [history]);

	const updateCurrentPage = useCallback(after => dispatch({type: after ? EXTRA_LOAD_AFTER : EXTRA_LOAD_BEFORE}), []);

	return [loading, error, {...state, allData: undefined}, updateCurrentPage];
}

const INITIAL_LOAD = "INITIAL_LOAD";
const INITIAL_LOAD_QUERY = "INITIAL_LOAD_QUERY";
const EXTRA_LOAD_AFTER = "EXTRA_LOAD_AFTER";
const EXTRA_LOAD_BEFORE = "EXTRA_LOAD_BEFORE";
const RESET = "RESET";

const reducer = (state, action) => {
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
};
