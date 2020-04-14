import {useCallback, useEffect, useReducer, useState} from "react";
import axios from "axios";
import {_, empty} from "src/lib/scripts";

import reducer, {ERROR, FETCHING, initialState, SUCCESS} from "./reducer";

export default function useFetch(inputUrl, method = "get", refineFunction = res => res.data) {
	const [url, setUrl] = useState(inputUrl);
	const [state, dispatch] = useReducer(reducer, initialState, () => initialState);
	const [fetch, setFetch] = useState(0);

	useEffect(() => {
		//  url is not yet set, do nothing
		if (empty(url)) return;
		console.log("fetchUrl>>>>", url);
		let unmounted = false;
		let source = axios.CancelToken.source();
		dispatch({type: FETCHING});
		axios[method](url, {
			cancelToken: source.token,
		})
			.then(res => {
				if (!unmounted) {
					const data = _.omitBy(refineFunction(res), _.isNil);
					const keys = _.keys(data);
					if (!empty(state.data) && _.isEqual(data[keys[0]], state.data[keys[0]])) return;
					dispatch({type: SUCCESS, payload: {data}});
				}
			})
			.catch(ex => {
				if (!unmounted) {
					console.warn("error during fetch", ex);
					dispatch({type: ERROR, payload: {errorMessage: ex.message}});
				}
			});
		return () => {
			unmounted = true;
			source.cancel("Cancel cleanup");
		};
		// eslint-disable-next-line
	}, [fetch, url, method]);

	const requestRefetch = useCallback(() => {
		setFetch(v => v + 1);
	}, [setFetch]);
	return [{...state}, requestRefetch, setUrl];
}
