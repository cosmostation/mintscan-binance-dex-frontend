import React, {useEffect, useMemo} from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";
//  utils
import consts from "src/constants/consts";
import useIndexedPagination from "src/hooks/useIndexedPagination";
import {usePrevious} from "src/hooks";
import {empty, formatNumber} from "src/lib/scripts";
// components
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import TxListTableRow from "../TableRow";
import {_} from "src/lib/scripts";
import {footerRender} from "src/components/common/IndexedPagination/IndexedPagination";

const INDEX_DISPLAY_DECIMAL_PLACES = 3;
const BASE_PROPERTY = "id";

const cx = classNames.bind(styles);

export default function(props) {
	const [loading, error, state, updateCurrentPage, [realTime, setRealTime], forceLoadAfter] = useIndexedPagination({
		path: consts.API.TXLIST,
		pageSize: 20,
		pagingProperty: BASE_PROPERTY,
		limit: 60,
		resolve: v => v,
		updateQuery: "txID",
	});
	const previousIsFront = usePrevious(state.isFront);
	//  copied from BlockList
	//========================
	useEffect(() => {
		if (empty(state.index)) return;
		const isFrontToTrue = state.isFront === true && previousIsFront === false;
		if (realTime === false && isFrontToTrue && state.pageData[state.index[0]].height === state.maxIndex) {
			// console.log("setRealTimeTrue");
			setRealTime(true);
		} else if (state.index[0] !== 0 && realTime === true) {
			// console.log("setRealTimeFalse");
			setRealTime(false);
		}
	}, [realTime, state.isFront]);

	const onePageClick = (after = false) => {
		if (after && state.isFront) return;
		if (realTime && !after) {
			// console.log("setRealTimeFalse");
			setRealTime(false);
		}
		if (!after && state.index[1] + state.pageSize > state.maxIndex) return;
		updateCurrentPage(after);
		// console.log("clicked next");
	};

	// TODO
	//  Front and last click
	const toFrontClick = (bool = true) => {};

	const realTimeButtonClick = e => {
		e.preventDefault();
		if (!state.isFront) return;
		// if (realTime === true) forceLoadAfter(true);
		// console.log("setRealTime click", !realTime);
		setRealTime(v => !v);
	};
	const formattedMaxHeight = useMemo(() => formatNumber(state.maxIndex, 3), [state.maxIndex]);
	//========================

	const tableHeaderRender = useMemo(
		() => (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell", "heightWidth")}>Tx Hash</TableCell>
					<TableCell className={cx("tableHeaderCell")}>Type</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='left'>
						From
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='left'>
						To
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						<span>Value</span>
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "heightWidth")} align='right'>
						<span>Height</span>
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "txsWidth")} align='right'>
						<span>Time</span>
					</TableCell>
				</TableRow>
			</TableHead>
		),
		[]
	);

	const tableBodyRender = useMemo(() => {
		const {pageData} = state;

		return (
			<TableBody>
				{_.map(pageData, v => (
					<TxListTableRow key={v.id} blockData={v} />
				))}
			</TableBody>
		);
	}, [state.pageData, state.pageSize]);

	return (
		<div className={cx("txListTableWrapper")}>
			<Table className={cx("table")}>
				{tableHeaderRender}
				{tableBodyRender}
			</Table>
			{footerRender(state, realTime, realTimeButtonClick, formattedMaxHeight, toFrontClick, onePageClick, BASE_PROPERTY, INDEX_DISPLAY_DECIMAL_PLACES, cx)}
		</div>
	);
}
