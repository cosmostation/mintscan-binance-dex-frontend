import React, {useState, useEffect, useCallback} from "react";
import {useGet} from "restful-react";

import _ from "lodash";

const pagerDefault = Object.freeze({
	currentPage: 1,
	pages: [1, 2, 3, 4, 5],
	totalPages: null,
	indexState: [null, null],
	isMore: true,
});

export default function(path, pageSize = 20, initialPage = 1, baseProperty = "height", limit = 100, resolve = null) {
	const {data, loading, error, refetch} = useGet({
		path: `${path}?limit=${limit}&offset=${pageSize * (initialPage - 1)}`,
		localErrorOnly: true,
		resolve: resolve,
	});

	const [pager, setPager] = useState(pagerDefault);
	const [allData, setAllData] = useState([]);

	//  when new data arrives, append to original data
	useEffect(() => {
		//  filter data and append to allData accordingly
		//  recalculate pager
	}, [data]);

	//  trigger refetch when currentPage changes, trigger automatic refetch every 0.9 seconds if page is 1
	useEffect(() => {
		//  check whether refetch is needed
		//  if needed calculate the height to be queried by checking the last / first entry of allData
	}, [pager.currentPage]);

	const setCurrentPage = useCallback(newPage => setPager(v => ({...v, currentPage: newPage})), []);

	return [loading, error, pager.pages, pager.currentPage, setCurrentPage];
}
