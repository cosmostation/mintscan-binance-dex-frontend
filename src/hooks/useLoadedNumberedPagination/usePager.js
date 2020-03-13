import {useEffect, useState} from "react";
import {_} from "src/lib/scripts";

const defaultPager = {
	totalCnt: 1,
	currentPage: 1,
	pageSize: 20,
	pageIndex: [0, 1],
	displayPageIndex: [],
};

export default function usePager(totalCnt = 0, currentPage = 1, pageSize = 20) {
	const [pager, setPager] = useState({...defaultPager, totalCnt, currentPage, pageSize});

	useEffect(() => {
		//  case : currentPage just changed
		const beginIndex = (pager.currentPage - 1) * pager.pageSize;
		const elemCnt = Math.min(pager.pageSize, pager.totalCnt - beginIndex);
		setPager(v => ({...v, pageIndex: [beginIndex, beginIndex + elemCnt]}));
	}, [pager.pageSize, pager.currentPage, pager.totalCnt]);

	const setCurrentPage = newPage => {
		if (!_.isSafeInteger(newPage) || newPage <= 0) throw new Error(`new page input is not a finite number / positive integer - ${newPage}`);
		setPager(v => ({...v, currentPage: newPage}));
	};
	const setPageSize = newSize => {
		if (!_.isSafeInteger(newSize) || newSize <= 0) throw new Error(`new size input is not a finite number / positive integer - ${newSize}`);
		setPager(v => ({...v, pageSize: newSize}));
	};
	const setTotalCnt = newTotal => setPager(v => ({...v, totalCnt: newTotal}));

	return [pager, setCurrentPage, setPageSize, setTotalCnt];
}
