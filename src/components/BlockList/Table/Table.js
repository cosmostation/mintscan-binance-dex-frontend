import React, {useEffect, useMemo} from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";
//  utils
import consts from "src/constants/consts";
import useIndexedPagination from "src/hooks/useIndexedPagination";
import {usePrevious} from "src/hooks";
import {_, empty, formatNumber, getPercentage} from "src/lib/scripts";
// components
import {Fade, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@material-ui/core";
import BlockListTableRow from "../TableRow";

import tooltips from "src/constants/tooltips";

const cx = classNames.bind(styles);

const INDEX_DISPLAY_DECIMAL_PLACES = 4;
const BASE_PROPERTY = "height";

export default function(props) {
	const [loading, error, state, updateCurrentPage, [realTime, setRealTime], forceLoadAfter] = useIndexedPagination({
		path: consts.API.BLOCKLIST,
		pageSize: 20,
		pagingProperty: BASE_PROPERTY,
		limit: 60,
		resolve: v => v,
		updateQuery: "blockHeight",
	});
	const previousIsFront = usePrevious(state.isFront);

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
		if (!after && state.index[1] + state.pageSize > state.maxIndexed) return;
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
	// console.log("check", state.maxIndex, state.pageData[0]?.height);
	const footerRender = (
		<div className={cx("blockList-table-footer")}>
			<div className={cx("paginationWrapper")}>
				<div className={cx("realtime", {inactive: !state.isFront})}>
					<button onClick={realTimeButtonClick} className={cx("checkBox", {clicked: realTime})} />
					<div className={cx("text")}>Real Time</div>
				</div>
				<div className={cx("heightWrapper")}>
					<p>
						<span>Height </span>
						{state.maxIndex ? getPercentage(state.pageData[0]?.[BASE_PROPERTY], state.maxIndex, INDEX_DISPLAY_DECIMAL_PLACES) : ""}%<span> of </span>
						{state.maxIndex ? formattedMaxHeight : ""}
					</p>
				</div>
				<div className={cx("buttonsWrapper")}>
					<img alt={"first"} className={cx("last", "flip", {inactive: state.isFront})} onClick={() => toFrontClick(true)} />
					<img alt={"left"} className={cx("right", "flip", {inactive: state.isFront})} onClick={() => onePageClick(true)} />
					<img alt={"right"} className={cx("right", {inactive: state.index[1] + state.pageSize > state.maxIndexed})} onClick={() => onePageClick(false)} />
					<img alt={"last"} className={cx("last")} onClick={() => toFrontClick(false)} />
				</div>
			</div>
		</div>
	);

	const tableBodyRender = useMemo(() => {
		const {pageData} = state;

		return (
			<TableBody>
				{_.map(pageData, (v, idx) => {
					if (v === undefined) return <BlockListTableRow key={idx} blockData={{}} />;
					return <BlockListTableRow key={v.height} blockData={v} />;
				})}
			</TableBody>
		);
	}, [state.pageData, state.pageSize]);

	const tableHeaderRender = useMemo(
		() => (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell", "heightWidth")}>Height</TableCell>
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

	return (
		<div className={cx("blockListtableWrapper")}>
			<Table className={cx("table")}>
				{tableHeaderRender}
				{tableBodyRender}
			</Table>
			{footerRender}
		</div>
	);
}
