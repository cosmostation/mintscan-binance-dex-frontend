import {useCallback, useEffect, useMemo, useReducer, useState} from "react";
import {useGet} from "restful-react";
import {useFetch} from "src/hooks";
import {useHistory} from "react-router-dom";

import queryString from "query-string";

import {_, empty, recursiveExpand} from "src/lib/scripts";
import consts from "src/constants/consts";

import reducer, {
	EXTRA_LOAD,
	EXTRA_LOAD_INIT,
	INITIAL_LOAD,
	INITIAL_LOAD_QUERY,
	PAGE_CHANGE,
	UPDATE_MAX_HEIGHT,
	UPDATE_ISFRONT,
	initialState,
	EXTRA_LOAD_FAIL,
} from "src/hooks/useIndexedPagination/reducer";

const SPARE_PAGE_CNT = 2; //  how many pages left before a refetch is triggered

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

	const fetchURL = useMemo(() => (refinedQuery === 1 ? "" : `${blocksURL}?limit=1`), [refinedQuery]);

	const [recentData, requestFetch, setUrl] = useFetch(fetchURL, "get");

	//  new data from recentData
	useEffect(() => {
		if (_.isNil(recentData.data?.data)) return;
		//  if start from middle update max height
		if (_.isNil(state.maxHeight))
			if (!_.isNil(recentData.data.data?.[0]?.height)) dispatch({type: UPDATE_MAX_HEIGHT, payload: recentData.data.data[0].height});
			else dispatch({type: UPDATE_MAX_HEIGHT, payload: recentData.data.data[0].height});
		if (recentData.data.data) console.log("getRecentData", recentData.data.data[0].height);
	}, [recentData.data]);

	//  appending new data
	useEffect(() => {
		if (_.isNil(data) && state.isFront === false && _.isBoolean(state.params.after)) {
			dispatch({type: UPDATE_ISFRONT});
		}
		if (!_.isNil(error) || (_.isNil(data) && !_.isBoolean(state.params.after))) return;

		//  initial load
		if (empty(state.index)) {
			//  initial load only occurs when refinedQuery is set
			if (refinedQuery === 1) return dispatch({type: INITIAL_LOAD, payload: {data, pageSize, index: [0, pageSize]}});
			// TODO
			//  define case when query is set
			else {
				getInitialLoadQuery(refinedQuery, {data, pageSize, index: [0, pageSize]});
				dispatch({type: EXTRA_LOAD_INIT, payload: {after: true}}); //  query for the ones before as well
			}
		}
		//  when new data arrives, append to allData
		else if (!empty(state.allData) && _.isBoolean(state.params.after)) {
			//  is data new?
			if (
				!_.isNil(data) &&
				((state.params.after === true && data[0]?.height > state.allData?.[0]?.height) ||
					(state.params.after === false && data[0]?.height < state.allData?.[state.allData.length - 1]?.height))
			) {
				dispatch({type: EXTRA_LOAD, payload: {data, after: state.params.after}});
			} else {
				//  data was attempted to be loaded but none returned
				// dispatch({type: EXTRA_LOAD_FAIL});
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
		console.log("pageChangeCheck>>>>>>", state.isFront, realTime, refinedQuery, pageData.length);
		if (error || empty(pageData)) return;
		if (state.isFront && refinedQuery !== 1) {
			setRefinedQuery(history, updateQuery, 0);
		}
		if (realTime) return;
		if (refinedQuery === pageData[0].height) return;
		setRefinedQuery(history, updateQuery, pageData[0].height);
	}, [pageData, realTime, state.isFront]);

	return [loading, error, {...state, pageData, allData: undefined, maxIndex: state.allData.length}, updateCurrentPage, [realTime, setRealTime]];
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
		parsed[queryValue] = value;
		history.replace(`${window.location.pathname}?${queryString.stringify(parsed)}`, {shallow: true});
	} else if (!(_.includes(parsedKeys, queryValue) && !empty(parsed[queryValue]) && _.isSafeInteger(parsed[queryValue]) && parsed[queryValue] >= 0)) {
		parsed[queryValue] = 0;
		history.replace(`${window.location.pathname}?${queryString.stringify(parsed)}`, {shallow: true});
	}
	//  -1 because we need the heights including the value(before returns descending)
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
