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
import {Fade, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@material-ui/core";
import BlockListTableRow, {TableRowThin} from "../TableRow";
import tooltips from "src/constants/tooltips";
import {footerRender} from "src/components/common/IndexedPagination/IndexedPagination";

const cx = classNames.bind(styles);

const INDEX_DISPLAY_DECIMAL_PLACES = 4;
const BASE_PROPERTY = "height";
const PAGE_SIZE = 20;

export default function(props) {
	const [, , state, updateCurrentPage, jumpToEnd, [realTime, setRealTime]] = useIndexedPagination({
		path: consts.API.BLOCKLIST,
		pageSize: PAGE_SIZE,
		pagingProperty: BASE_PROPERTY,
		limit: 60,
		resolve: v => v,
		updateQuery: "blockHeight",
	});
	const previousIsFront = usePrevious(state.isFront);

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
	const formattedMaxHeight = useMemo(() => formatNumber(state.maxIndex, 3), [state.maxIndex]);
	// console.log("check", state.maxIndex, state.pageData[0]?[BASE_PROPERTY]);

	const tableBodyRender = useMemo(() => {
		return (
			<TableBody>
				{_.map(
					empty(state.pageData) || (state.pageData.length < PAGE_SIZE && state.isNoMore)
						? Array.from({length: PAGE_SIZE}, (z, idx) => ({id: idx}))
						: state.pageData,
					(v, idx) => {
						if (v === undefined) return <BlockListTableRow key={idx} blockData={{}} />;
						// TODO - fix this
						//  it is optimal to use 'v[BASE_PROPERTY]' as key but it scrolls to bottom of page
						//  current approach rerenders entire list on each rerender - needs to be optimized
						//  same applies to table in TxList
						return <BlockListTableRow key={idx} blockData={v} />;
					}
				)}
			</TableBody>
		);
	}, [state.pageData, state.isNoMore]);

	const thinTableBodyRender = useMemo(() => {
		return (
			<ul className={cx("thinTableRows-wrapper")}>
				{_.map(empty(state.pageData) ? Array.from({length: PAGE_SIZE}, (z, idx) => ({id: idx})) : state.pageData, (v, idx) => {
					if (v === undefined)
						return (
							<li key={idx}>
								<TableRowThin key={idx} blockData={{}} />
							</li>
						);
					return (
						<li key={idx}>
							<TableRowThin key={idx} blockData={v} />
						</li>
					);
				})}
			</ul>
		);
	}, [state.pageData]);

	const realTimeButtonClick = e => {
		e.preventDefault();
		if (!state.isFront) return;
		// if (realTime === true) forceLoadAfter(true);
		// console.log("setRealTime click", !realTime);
		setRealTime(v => !v);
	};

	const onMouseEnter = useCallback(() => setRealTime(false), [setRealTime]);
	const onMouseLeave = useCallback(() => {
		if (!state.isFront || state.maxIndex !== state.pageData?.[0]?.[BASE_PROPERTY]) return;
		setRealTime(true);
		// eslint-disable-next-line
	}, [setRealTime, state.isFront]);

	return (
		<div className={cx("blockListtableWrapper")}>
			<Table className={cx("table")} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				{blocksHeaderRender}
				{tableBodyRender}
			</Table>
			{footerRender(state, realTime, realTimeButtonClick, formattedMaxHeight, onePageClick, BASE_PROPERTY, INDEX_DISPLAY_DECIMAL_PLACES, jumpToEnd)}
			<div className={cx("thinTable")}>{thinTableBodyRender}</div>
		</div>
	);
}

export const blocksHeaderRender = (
	<TableHead>
		<TableRow>
			<TableCell className={cx("tableHeaderCell")}>Height</TableCell>
			<TableCell className={cx("tableHeaderCell")}>Parent Hash</TableCell>
			<TableCell className={cx("tableHeaderCell")} align='left'>
				<Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} title={tooltips.proposer} disableFocusListener disableTouchListener>
					<span>Node</span>
				</Tooltip>
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "txsWidth")} align='right'>
				<Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} title={tooltips.txs} disableFocusListener disableTouchListener>
					<span>Txs</span>
				</Tooltip>
			</TableCell>
			<TableCell className={cx("tableHeaderCell")} align='right'>
				Time
			</TableCell>
		</TableRow>
	</TableHead>
);
