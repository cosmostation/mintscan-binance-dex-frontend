import {useState, useMemo, useEffect} from "react";

//  hooks
import usePager from "./usePager";

//  not used due to asset pages not being paginated
export default function(initValues = []) {
	const [pager, setCurrentPage, setPageSize, setTotalCnt] = usePager(100, 1, 20);
	const [values, setValues] = useState(initValues);

	useEffect(() => {
		if (pager.totalCnt !== values.length) setTotalCnt(values.length);
	}, [pager.totalCnt, values.length, setTotalCnt]);

	const pagedValues = useMemo(() => values.slice(pager.pageIndex[0], pager.pageIndex[1]), [values, pager.pageIndex]);
	return [pagedValues, setValues, setCurrentPage, setPageSize];
}
