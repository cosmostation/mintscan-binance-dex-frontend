import React, {useEffect, useMemo} from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";
//  utils
import consts from "src/constants/consts";
import useIndexedPagination from "src/hooks/useIndexedPagination";
import {usePrevious} from "src/hooks";
import {_, empty, formatNumber} from "src/lib/scripts";
// components
import {Fade, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@material-ui/core";
import BlockListTableRow from "../TableRow";

import tooltips from "src/constants/tooltips";
import {footerRender} from "src/components/common/IndexedPagination/IndexedPagination";

const cx = classNames.bind(styles);

const INDEX_DISPLAY_DECIMAL_PLACES = 4;
const BASE_PROPERTY = "height";
const PAGE_SIZE = 20;

export default function(props) {
	const [loading, error, state, updateCurrentPage, [realTime, setRealTime], forceLoadAfter] = useIndexedPagination({
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
		if (realTime === false && isFrontToTrue && state.pageData[state.index[0]][BASE_PROPERTY] === state.maxIndex) {
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
		if (!after && state.index[1] + state.pageSize > state.maxIndexed) return;
		updateCurrentPage(after);
		// console.log("clicked next");
	};
	const formattedMaxHeight = useMemo(() => formatNumber(state.maxIndex, 3), [state.maxIndex]);
	// console.log("check", state.maxIndex, state.pageData[0]?[BASE_PROPERTY]);

	const tableBodyRender = useMemo(() => {
		const {pageData} = state;
		return (
			<TableBody>
				{_.map(empty(pageData) ? Array.from({length: PAGE_SIZE}, (z, idx) => ({id: idx})) : pageData, (v, idx) => {
					if (v === undefined) return <BlockListTableRow key={idx} blockData={{}} />;
					return <BlockListTableRow key={v[BASE_PROPERTY]} blockData={v} />;
				})}
			</TableBody>
		);
	}, [state.pageData, state.pageSize]);

	const tableHeaderRender = useMemo(
		() => (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell")}>Height</TableCell>
					<TableCell className={cx("tableHeaderCell")}>Parent Hash</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='left'>
						<Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} title={tooltips.proposer} disableFocusListener disableTouchListener>
							<span>Node</span>
						</Tooltip>
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						Fee(no-data)
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
		),
		[]
	);

	const realTimeButtonClick = e => {
		e.preventDefault();
		if (!state.isFront) return;
		// if (realTime === true) forceLoadAfter(true);
		// console.log("setRealTime click", !realTime);
		setRealTime(v => !v);
	};

	return (
		<div className={cx("blockListtableWrapper")}>
			<Table className={cx("table")}>
				{tableHeaderRender}
				{tableBodyRender}
			</Table>
			{footerRender(state, realTime, realTimeButtonClick, formattedMaxHeight, onePageClick, BASE_PROPERTY, INDEX_DISPLAY_DECIMAL_PLACES, cx)}
		</div>
	);
}
