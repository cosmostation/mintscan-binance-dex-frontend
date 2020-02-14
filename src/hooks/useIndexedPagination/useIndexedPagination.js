import {useCallback, useEffect, useMemo, useReducer, useState} from "react";
import {useGet} from "restful-react";
import {useFetch, useTimer} from "src/hooks";
import {useHistory} from "react-router-dom";

import queryString from "query-string";

import {_, empty} from "src/lib/scripts";
import consts from "src/constants/consts";

import reducer, {
	EXTRA_LOAD,
	EXTRA_LOAD_FAIL,
	EXTRA_LOAD_INIT,
	INITIAL_LOAD,
	INITIAL_LOAD_QUERY,
	initialState,
	PAGE_CHANGE,
	RECENT_DATA_LOAD,
	UPDATE_ISFRONT,
	UPDATE_MAX_HEIGHT,
} from "src/hooks/useIndexedPagination/reducer";

const SPARE_PAGE_CNT = 2; //  how many pages left before a refetch is triggered
const REAL_TIME_DELAY_MS = 2000;

const blocksURL = `${consts.API_BASE()}${consts.API.BLOCKLIST}`;
let renderCnt = 0;
export default function({path, pageSize = 20, pagingProperty = "height", limit = 60, resolve = undefined, updateQuery = ""}) {
	renderCnt++;
	const history = useHistory();
	const [state, dispatch] = useReducer(reducer, initialState, () => initialState);
	const refinedQuery = useMemo(() => {
		if (updateQuery === "") return;
		return setRefinedQuery(history, updateQuery);
	}, [updateQuery, history]);
	const [realTime, setRealTime] = useState(refinedQuery === 1);

	const {data, loading, error, refetch} = useGet({
		path: refinedQuery === 1 ? `${path}?limit=${limit}` : `${path}?limit=${limit}&before=${refinedQuery}`,
		resolve: resolve,
	});

	// CASE 0
	//  Only use refetch when retrieving cutting-edge data
	// CASE !0
	//  First use to retrieve top height block, then use to refetch cutting-edge data(if user reaches first height)

	const [recentData, requestFetch, setUrl] = useFetch("", "get");

	const [watch, setWatch] = useTimer(realTime, REAL_TIME_DELAY_MS);

	//  for real time data
	useEffect(() => {
		if (error || empty(state.allData) || realTime === false) return;
		if (recentData.loading === false && recentData.error === false) {
			// console.log("[request recent data]");
			//  DEBUGGING - to prevent realtime data stream
			// return;
			if (loading) return;
			setUrl(blocksURL + getQueryParams(state.allData, true, pagingProperty, "", limit));
		}
	}, [watch]);
	useEffect(() => {
		if (error) return;
		// console.log("setting setWatch", realTime);
		setWatch(realTime);
	}, [realTime]);

	//  new data from recentData
	useEffect(() => {
		if (_.isNil(recentData.data?.data)) return;
		//  if start from middle update max height
		if (_.isNil(state.maxIndex)) {
			if (!_.isNil(recentData.data.data?.[0][pagingProperty]))
				dispatch({
					type: UPDATE_MAX_HEIGHT,
					payload: recentData.data.data[0][pagingProperty],
				});
			else dispatch({type: UPDATE_MAX_HEIGHT, payload: recentData.data.data[0][pagingProperty]});
			return;
		}
		if (recentData.data.data) {
			// console.log("getRecentData", recentData.data.data[0][pagingProperty]);
			dispatch({type: RECENT_DATA_LOAD, payload: {data: recentData.data.data, maxIndex: Number(recentData.data.paging.total)}});
			if (recentData.data.data.length > limit) {
				console.warn(`getRecentData overflowed (${recentData.data.data.length}>${limit}[limit])`);
				// TODO
				//  exception handling when recentData query is insufficient
			}
		}
	}, [recentData.data]);

	// TODO
	//  query for new maxIndex when user queries for value higher than maxIndex
	//  or only after maxIndex hasn't been updated for longer than # seconds

	//  appending new data
	useEffect(() => {
		if (_.isNil(data?.data) && state.isFront === false && realTime && _.isBoolean(state.params.after)) {
			dispatch({type: UPDATE_ISFRONT});
		}
		if (!_.isNil(error) || (_.isNil(data?.data) && !_.isBoolean(state.params.after))) return;

		//  initial load
		if (empty(state.index)) {
			//  initial load only occurs when refinedQuery is set
			if (refinedQuery === 1) {
				return dispatch({type: INITIAL_LOAD, payload: {data: data.data, pageSize, index: [0, pageSize], maxIndex: Number(data.paging.total)}});
			}
			// TODO
			//  define case when query is set
			else {
				getInitialLoadQuery(refinedQuery, {data: data.data, maxIndex: Number(data.paging.total), pageSize, index: [0, pageSize]});
				dispatch({type: EXTRA_LOAD_INIT, payload: {after: true}}); //  query for the ones before as well
			}
		}
		//  when new data arrives, append to allData
		else if (!empty(state.allData) && _.isBoolean(state.params.after)) {
			//  is data new?
			if (!_.isNil(data?.data)) {
				if (
					(state.params.after === true && data.data[0]?.[pagingProperty] > state.allData?.[0]?.[pagingProperty]) ||
					(state.params.after === false && data.data[0]?.[pagingProperty] < state.allData?.[state.allData.length - 1]?.[pagingProperty])
				) {
					dispatch({type: EXTRA_LOAD, payload: {data: data.data, after: state.params.after, loading, maxIndex: Number(data.paging.total)}});
				}
			} else {
				if ((state.index[0] === 0 && state.params.after === false) || (state.index[1] === state.allData.length - 1 && state.params.after === true))
					dispatch({type: EXTRA_LOAD_FAIL});
			}
		}

		async function getInitialLoadQuery(refinedQuery, payload) {
			return dispatch({type: INITIAL_LOAD_QUERY, payload: {...payload}});
		}
	}, [error, data, pageSize, state.index]);

	//  check param change and if refetch is needed, do it! Else don't.
	useEffect(() => {
		if (!_.isBoolean(state.params.after)) return;
		//  change page if necessary
		if (!(state.isFront !== true && state.params.after !== false && state.index[0] === 0)) {
			dispatch({type: PAGE_CHANGE, payload: {after: state.params.after}});
		}
		if (state.params.after === false) {
			//  case, not enough left (pageSize*SPARE_PAGE_CNT) => trigger refetch
			// console.log("compare", state.index[1] + pageSize, "??", state.allData.length - 1 - pageSize * SPARE_PAGE_CNT);
			if (state.index[1] + pageSize > state.allData.length - 1 - pageSize * SPARE_PAGE_CNT && !state.isNoMore) {
				refetch({
					path: getQueryParams(state.allData, state.params.after, pagingProperty, path, limit),
				});
			}
		} else {
			if (state.isFront === true) throw new Error("Exception - Attempt to trigger more recent data at front");
			if (state.index[0] < SPARE_PAGE_CNT * (pageSize - 1))
				refetch({
					path: getQueryParams(state.allData, state.params.after, pagingProperty, path, limit),
				});
		}
	}, [state.params]);

	//  initialize for data fetching and/or page change
	const updateCurrentPage = useCallback(
		after => {
			if (state.isFront && after === true) return;
			dispatch({type: EXTRA_LOAD_INIT, payload: {after}});
		},
		[state.isFront]
	);

	// console.log("stateCheck outside>>>", `${renderCnt} ${recursiveExpand({..._.omit(state, ["allData"]), allDataSize: state.allData.length})}`);

	//  data refining process
	const getPageData = useCallback(() => _.slice(state.allData, state.index[0], state.index[1]), [state.allData, state.index]);
	const pageData = useMemo(() => getPageData(), [getPageData]);

	//  update query if changed
	useEffect(() => {
		// console.log("pageChangeCheck>>>>>>", {
		// 	..._.omit(state, ["allData", "error", "isNoMore", "maxIndex"]),
		// 	allDataSize: state.allData.length,
		// 	realTime,
		// });
		if (error || empty(pageData)) return;
		// console.log("refinedQuery", refinedQuery);
		if (realTime) {
			setRefinedQuery(history, updateQuery, 0);
			return;
		}

		if (refinedQuery === pageData[0][pagingProperty] + 1) return;
		setRefinedQuery(history, updateQuery, pageData[0][pagingProperty]);
	}, [pageData, state.isFront]);

	const forceLoadAfter = after => dispatch({type: EXTRA_LOAD_INIT, payload: {after: after}}); //  query for the ones before as well

	return [
		loading,
		error,
		{...state, pageData, allData: undefined, maxIndexed: state.allData.length},
		updateCurrentPage,
		[realTime, setRealTime],
		forceLoadAfter,
	];
}

//  get query params to query from server
const getQueryParams = (arr, after, baseProperty, path, limit) => {
	const baseHeight = after ? arr[0]?.[baseProperty] : arr[arr.length - 1]?.[baseProperty];
	if (_.isNil(baseHeight)) return throw new Error("First or last element in array does not have baseProperty set");
	return `${path}?limit=${limit}&${after ? "after" : "before"}=${baseHeight}`;
};

//  set query to 0 if not set, sets to value if value is set, returns query+1 for realistic before server query
const setRefinedQuery = (history, queryValue, value) => {
	const parsed = queryString.parse(history.location.search, {parseNumbers: true});
	const parsedKeys = _.keys(parsed);
	if (!_.isNil(value)) {
		if (parsed[queryValue] === value) return;
		parsed[queryValue] = value;
		history.replace(`${window.location.pathname}?${queryString.stringify(parsed)}`, {shallow: true});
	} else if (!(_.includes(parsedKeys, queryValue) && !empty(parsed[queryValue]) && _.isSafeInteger(parsed[queryValue]) && parsed[queryValue] >= 0)) {
		parsed[queryValue] = 0;
		history.replace(`${window.location.pathname}?${queryString.stringify(parsed)}`, {shallow: true});
	}
	//  +1 because we need the heights including the value(before returns descending)
	return parsed[queryValue] + 1;
};

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