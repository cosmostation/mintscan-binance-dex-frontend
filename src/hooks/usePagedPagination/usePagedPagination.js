// import {useEffect, useState, useReducer} from "react";

import consts from "src/constants/consts";
//  hooks
import {useFetch} from "src/hooks";

const queryGenerate = (page, pageSize) => `&page=${page}&rows=${Math.min(pageSize * (consts.NUM.SPARE_PAGE_CNT + 1), consts.NUM.BINACE_API_ROWS_LIMIT)}`;

export default function usePagedPagination({path = "", pageSize = 10, method = "get"}) {
	const [fetchState, ,] = useFetch(`${consts.API_BASE}${path}${queryGenerate(1, pageSize)}`, "get");

	return [fetchState];
}
