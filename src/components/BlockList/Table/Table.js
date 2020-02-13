import React, {useMemo, useEffect} from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";
//  utils
import consts from "src/constants/consts";
import useIndexedPagination from "src/hooks/useIndexedPagination";
import {usePrevious} from "src/hooks";
// components
import {Fade, Table, TableCell, TableHead, TableRow, TableBody, Tooltip} from "@material-ui/core";
import BlockListTableRow from "../TableRow";

import tooltips from "src/constants/tooltips";
import {_, formatNumber} from "src/lib/scripts";

const cx = classNames.bind(styles);

export default function(props) {
	const [loading, error, state, updateCurrentPage, [realTime, setRealTime]] = useIndexedPagination({
		path: consts.API.BLOCKLIST,
		pageSize: 20,
		baseProperty: "height",
		limit: 60,
		resolve: v => v.data,
		updateQuery: "blockHeight",
	});
	const previousIsFront = usePrevious(state.isFront);

	useEffect(() => {
		if (loading !== true && realTime === false && state.isFront === true && previousIsFront === false) setRealTime(true);
	}, [realTime, state.isFront]);

	const onePageClick = (after = false) => {
		if (after && state.isFront) return;
		if (realTime && !after) {
			console.log("setRealTimeFalse");
			setRealTime(false);
		}
		if (!after && state.index[1] + state.pageSize > state.maxIndex) return;
		updateCurrentPage(after);
		console.log("clicked next");
	};

	// TODO
	//  Front and last click
	const toFrontClick = (bool = true) => {};

	const realTimeButtonClick = e => {
		e.preventDefault();
		if (!state.isFront) return;
		setRealTime(v => !v);
	};
	const formattedMaxHeight = useMemo(() => formatNumber(state.maxHeight, 3), [state.maxHeight]);
	const footerRender = (
		<div className={cx("table-footer")}>
			<div className={cx("paginationWrapper")}>
				<div className={cx("realtime", {inactive: !state.isFront || loading === true})}>
					<button onClick={realTimeButtonClick} className={cx("checkBox", {clicked: realTime && state.isFront})} />
					<div className={cx("text")}>Real Time</div>
				</div>
				<div className={cx("heightWrapper")}>
					<p>
						<span>Height </span>99.999%<span> of </span>
						{state.maxHeight ? formattedMaxHeight : ""}
					</p>
				</div>
				<div className={cx("buttonsWrapper")}>
					<img alt={"first"} className={cx("last", "flip", {inactive: state.isFront})} onClick={() => toFrontClick(true)} />
					<img alt={"left"} className={cx("right", "flip", {inactive: state.isFront})} onClick={() => onePageClick(true)} />
					<img alt={"right"} className={cx("right", {inactive: state.index[1] + state.pageSize > state.maxIndex})} onClick={() => onePageClick(false)} />
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
		<div className={cx("tableWrapper")}>
			<Table className={cx("table")}>
				{tableHeaderRender}
				{tableBodyRender}
			</Table>
			{footerRender}
		</div>
	);
}
