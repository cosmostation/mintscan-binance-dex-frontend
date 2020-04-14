/*
 * WARNING
 * the code here deliberately contains missing dependencies in hooks(probably)
 * A LOT of refactoring will probably be needed if attempted to fix.
 * You have been warned
 */
import React, {useCallback, useEffect, useMemo} from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";
//  utils
import consts from "src/constants/consts";
import useIndexedPagination from "src/hooks/useIndexedPagination";
import {usePrevious} from "src/hooks";
import {_, empty, formatNumber} from "src/lib/scripts";
// components
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import TxListTableRow, {TableRowThin} from "../TableRow";
import {footerRender} from "src/components/common/IndexedPagination/IndexedPagination";

const cx = classNames.bind(styles);

const INDEX_DISPLAY_DECIMAL_PLACES = 3;
const BASE_PROPERTY = "id";
const PAGE_SIZE = 20;

export default function(props) {
	const [, , state, updateCurrentPage, jumpToEnd, [realTime, setRealTime]] = useIndexedPagination({
		path: consts.API.TXLIST,
		pageSize: PAGE_SIZE,
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
		if (realTime === false && isFrontToTrue && state.pageData[state.index[0]]?.[BASE_PROPERTY] === state.maxIndex) {
			// console.log("setRealTimeTrue");
			setRealTime(true);
		} else if (state.index[0] !== 0 && realTime === true) {
			// console.log("setRealTimeFalse");
			setRealTime(false);
		}
		// eslint-disable-next-line
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

	const realTimeButtonClick = e => {
		e.preventDefault();
		if (!state.isFront) return;
		// if (realTime === true) forceLoadAfter(true);
		// console.log("setRealTime click", !realTime);
		setRealTime(v => !v);
	};
	const formattedMaxHeight = useMemo(() => formatNumber(state.maxIndex, 3), [state.maxIndex]);
	//========================

	const tableBodyRender = useMemo(() => {
		return (
			<TableBody>
				{_.map(empty(state.pageData) ? Array.from({length: PAGE_SIZE}, (z, idx) => ({id: idx})) : state.pageData, (v, idx) => (
					// TODO - comment in components/BlockList/Table.js
					//  should use v.id
					<TxListTableRow key={idx} blockData={v} />
				))}
			</TableBody>
		);
	}, [state.pageData]);

	const thinTableBodyRender = useMemo(() => {
		return (
			<ul className={cx("thinTableRows-wrapper")}>
				<div className={cx("tableDivider")} />
				{_.map(empty(state.pageData) ? Array.from({length: PAGE_SIZE}, (z, idx) => ({id: idx})) : state.pageData, (v, idx) => {
					if (v === undefined)
						return (
							<li key={idx}>
								<TableRowThin key={idx} blockData={{}} />
								<div className={cx("tableDivider")} />
							</li>
						);
					return (
						<li key={idx}>
							<TableRowThin key={idx} blockData={v} />
							<div className={cx("tableDivider")} />
						</li>
					);
				})}
			</ul>
		);
	}, [state.pageData]);

	const onMouseEnter = useCallback(() => setRealTime(false), [setRealTime]);
	const onMouseLeave = useCallback(() => {
		if (!state.isFront || state.maxIndex !== state.pageData?.[0]?.[BASE_PROPERTY]) return;
		setRealTime(true);
		// eslint-disable-next-line
	}, [setRealTime, state.isFront]);

	return (
		<div className={cx("txListTableWrapper")}>
			<Table className={cx("table")} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				{txTableHeader}
				{tableBodyRender}
			</Table>
			{footerRender(state, realTime, realTimeButtonClick, formattedMaxHeight, onePageClick, BASE_PROPERTY, INDEX_DISPLAY_DECIMAL_PLACES, jumpToEnd)}
			<div className={cx("thinTable")}>{thinTableBodyRender}</div>
		</div>
	);
}

export const txTableHeader = (
	<TableHead>
		<TableRow>
			<TableCell className={cx("tableHeaderCell", "txHashWidth")}>Tx Hash</TableCell>
			<TableCell className={cx("tableHeaderCell")}>Type</TableCell>
			<TableCell className={cx("tableHeaderCell", "addrWidth")} align='left'>
				Address
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "padding-right10")} align='right'>
				Value
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "padding-left10", "currencyWidth")} align='left'>
				Currency
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "heightWidth")} align='right'>
				<span>Height</span>
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "txsWidth")} align='right'>
				<span>Time</span>
			</TableCell>
		</TableRow>
	</TableHead>
);
