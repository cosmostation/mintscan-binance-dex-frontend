import {useEffect, useCallback, useReducer} from "react";
import {useGet} from "restful-react";

import empty from "is-empty";
import _ from "lodash";
import useHistoryByCase from "components/common/hooks/useHistoryByCase";

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

const pagerInitial = {
	currentPage: 0,
	pageSize: null,
	totalPages: null,
	indexState: [null, null],
	isMore: true,
};

const initialState = {
	pager: pagerInitial,
	allData: [],
	params: {height: null, after: true},
};

export default function(path, pageSize = 20, initialPage = 1, baseProperty = "height", limit = 60, resolve = undefined, updateQuery = "") {
	//  the api call
	const {data, loading, error, refetch} = useGet({
		path: `${path}?limit=${limit}&offset=${pageSize * (initialPage - 1)}`,
		resolve: resolve,
	});
	//  state nicely wrapped up
	const [state, dispatch] = useReducer(reducer, initialState, null);
	//  history hook to switch query around
	const history = useHistoryByCase(updateQuery !== "");

	//  when new data arrives, append to original data
	useEffect(() => {
		if (_.isNil(data)) return;
		//  filter data and append to allData accordingly
		//  case, initial load
		if (empty(state.allData)) {
			//  initial load only occurs when initialPage is set
			dispatch({type: INITIAL_LOAD, payload: {data, currentPage: initialPage, pageSize}});
		}
		//  recalculate pager
		console.log("pagination info>>>>>>>>", data, state.pager);
	}, [data]);

	//  trigger refetch when currentPage changes, trigger automatic refetch every 0.9 seconds if page is 1
	useEffect(() => {
		if (state.pager.currentPage === 0) return;
		//  check whether refetch is needed
		//  if needed calculate the height to be queried by checking the last / first entry of allData
	}, [state.pager.currentPage]);

	useEffect(() => {
		if (history === null) return;
		//  if updateQuery is defined, use history to update location etc.
	}, [history]);

	const updateCurrentPage = useCallback(newPage => dispatch({type: CURRENT_PAGE_CHANGE, payload: {currentPage: newPage}}), []);

	return [loading, error, state.pager.pageState, state.pager.currentPage, updateCurrentPage];
}

const INITIAL_LOAD = "INITIAL_LOAD";
const EXTRA_LOAD_AFTER = "EXTRA_LOAD_AFTER";
const EXTRA_LOAD_BEFORE = "EXTRA_LOAD_BEFORE";
const CURRENT_PAGE_CHANGE = "CURRENT_PAGE_CHANGE";
const RESET = "RESET";

const reducer = (state, action) => {
	switch (action.type) {
		case INITIAL_LOAD:
		case EXTRA_LOAD_AFTER:
		case EXTRA_LOAD_BEFORE:
		case CURRENT_PAGE_CHANGE:
		case RESET:
			return {...initialState};
		default:
			throw new Error(`Undefined action type: ${action.type}`);
	}
};
