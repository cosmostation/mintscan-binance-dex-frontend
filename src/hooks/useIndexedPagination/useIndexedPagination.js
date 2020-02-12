import {useCallback, useEffect, useMemo, useReducer, useState} from "react";
import {useGet} from "restful-react";
import useFetch from "src/hooks/useFetch/useFetch";
import {useHistory} from "react-router-dom";

import queryString from "query-string";

import {_, empty} from "src/lib/scripts";
import consts from "src/constants/consts";

import reducer, {EXTRA_LOAD, EXTRA_LOAD_INIT, INITIAL_LOAD, INITIAL_LOAD_QUERY, PAGE_CHANGE, initialState} from "src/hooks/useIndexedPagination/reducer";

const SPARE_PAGE_CNT = 2; //  how many pages left before a refetch is triggered

export default function({path, pageSize = 20, pagingProperty = "height", limit = 100, resolve = undefined, updateQuery = ""}) {
	const history = useHistory();
	const [state, dispatch] = useReducer(reducer, initialState, () => initialState);
	const [lock, setLock] = useState(false);
	const refinedQuery = useMemo(() => {
		if (updateQuery === "") return;
		return setRefinedQuery(history, updateQuery);
	}, [updateQuery, history]);

	//
	// //  on query change, trigger refetch if leftover index <= pageSize*2
	// useEffect(() => {
	// 	if (empty(updateQuery) || empty(state.allData) || empty(state.index)) return;
	// 	if (state.allData[state.index[1]]?.height === refinedQuery || refinedQuery === 0) {
	// 		console.log("compare", state.allData[state.index[1]]?.height, refinedQuery);
	// 		return;
	// 	}
	// }, [refinedQuery, updateQuery, state.allData, state.index]);

	const {data, loading, error, refetch} = useGet({
		path: refinedQuery === 1 ? `${path}?limit=${limit}` : `${path}?limit=${limit}&before=${refinedQuery}`,
		resolve: resolve,
	});

	// CASE 0
	//  Only use refetch when retrieving cutting-edge data
	// CASE !0
	//  First use to retrieve top height block, then use to refetch cutting-edge data(if user reaches first height)
	const [recentData, requestFetch, setUrl] = useFetch(refinedQuery === 0 ? "" : `${blocksURL}?limit=1`, "get");

	//  new data from recentData
	useEffect(() => {
		if (_.isNil(recentData.data)) return;
	}, [recentData]);

	//  appending new data
	useEffect(() => {
		if (!_.isNil(error) || _.isNil(data)) return;

		//  initial load
		if (empty(state.index)) {
			//  initial load only occurs when refinedQuery is set
			if (refinedQuery === 1) return dispatch({type: INITIAL_LOAD, payload: {data, pageSize, index: [0, pageSize]}});
			// TODO
			//  define case when query is set
			else {
				getInitialLoadQuery(refinedQuery, {data, pageSize, index: [0, pageSize]});
				dispatch({type: EXTRA_LOAD_INIT, payload: {after: true}});
			}
		}
		//  when new data arrives, append to allData
		else if (!empty(state.allData) && _.isBoolean(state.params.after)) {
			//  is data new?
			if (
				(state.params.after === true && data[0]?.height > state.allData[0].height) ||
				(state.params.after === false && data[0]?.height < state.allData[state.allData.length - 1].height)
			)
				dispatch({type: EXTRA_LOAD, payload: {data, after: state.params.after}});
		}

		async function getInitialLoadQuery(refinedQuery, payload) {
			return dispatch({type: INITIAL_LOAD_QUERY, payload: {...payload}});
		}
	}, [error, data, pageSize, state.index, state.allData]);

	//  check param change and if refetch is needed, do it! Else don't.
	useEffect(() => {
		if (!_.isBoolean(state.params.after)) return;
		if (!(state.isFront === false && state.params.after === true && state.index[0] === 0)) dispatch({type: PAGE_CHANGE, payload: {after: state.params.after}});
		if (state.params.after === false) {
			//  case, not enough left (pageSize*SPARE_PAGE_CNT) => trigger refetch
			console.log("compare", state.index[1] + pageSize, "??", state.allData.length - 1 - pageSize * SPARE_PAGE_CNT);
			if (state.index[1] + pageSize > state.allData.length - 1 - pageSize * SPARE_PAGE_CNT) {
				refetch({
					path: getQueryParams(state.allData, state.params.after, pagingProperty, path, limit),
				});
			}
		} else {
			if (state.isFront === true) throw new Error("Exception - Attempt to trigger more recent data at front");
			if (state.index[0] < SPARE_PAGE_CNT * pageSize)
				refetch({
					path: getQueryParams(state.allData, state.params.after, pagingProperty, path, limit),
				});
		}
	}, [state.params]);

	//  change query string to induce api fetch
	const updateCurrentPage = useCallback(
		after => {
			if (state.isFront && after === true) return;

			dispatch({type: EXTRA_LOAD_INIT, payload: {after}});
		},
		[state.isFront]
	);
	// console.log("stateCheck outside>>>", _.cloneDeep(state));
	const getPageData = useCallback(() => _.slice(state.allData, state.index[0], state.index[1]), [state.allData, state.index]);
	const pageData = useMemo(() => getPageData(), [getPageData]);

	//  update query if changed
	useEffect(() => {
		if (error || state.isFront || empty(pageData)) return;
		if (refinedQuery === pageData[0].height) return;
		setRefinedQuery(history, updateQuery, pageData[0].height);
	}, [pageData]);
	return [loading, error, {...state, pageData, allData: undefined}, updateCurrentPage, [lock, setLock]];
}

const getQueryParams = (arr, after, baseProperty, path, limit) => {
	const baseHeight = after ? arr[0]?.[baseProperty] : arr[arr.length - 1]?.[baseProperty];
	if (_.isNil(baseHeight)) return throw new Error("First or last element in array does not have baseProperty set");
	return `${path}?limit=${limit}&${after ? "after" : "before"}=${baseHeight}`;
};
const blocksURL = `${consts.API_BASE}${consts.API.BLOCKLIST}`;

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
