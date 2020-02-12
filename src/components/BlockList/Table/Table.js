import React, {useMemo} from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";
//  utils
import consts from "src/constants/consts";
import useIndexedPagination from "src/hooks/useIndexedPagination";
// components
import {Fade, Table, TableCell, TableHead, TableRow, TableBody, Tooltip} from "@material-ui/core";
import BlockListTableRow from "../TableRow";

import tooltips from "src/constants/tooltips";
import {_} from "src/lib/scripts";

const cx = classNames.bind(styles);

export default function(props) {
	const [loading, error, state, updateCurrentPage, [lock, setLock]] = useIndexedPagination({
		path: consts.API.BLOCKLIST,
		pageSize: 20,
		baseProperty: "height",
		limit: 40,
		resolve: v => v.data,
		updateQuery: "blockHeight",
	});
	const imsiButtonPress = (bool = false) => {
		updateCurrentPage(bool);
		console.log("clicked next");
	};
	// console.log("state", state);
	// TODO
	//  calculate when "inactive" class is added to the buttons
	const footerRender = useMemo(
		() => (
			<div className={cx("table-footer")}>
				<div className={cx("paginationWrapper")}>
					<div className={cx("realtime")}>
						<img onClick={() => setLock(v => !v)} className={cx("checkBox", {clicked: lock})} alt={"none"} />
						<div className={cx("text")}>Real Time</div>
					</div>
					<div className={cx("heightWrapper")}>
						<p>
							<span>Height </span>99.999%<span> of </span>167,299,294
						</p>
					</div>
					<div className={cx("buttonsWrapper")}>
						<img alt={"first"} className={cx("last", "flip")} />
						<img alt={"left"} className={cx("right", "flip")} />
						<img alt={"right"} className={cx("right")} />
						<img alt={"last"} className={cx("last")} />
					</div>
				</div>
			</div>
		),
		[lock, setLock]
	);

	const tableBodyRender = useMemo(
		() => (
			<TableBody>
				{_.map(state.pageData, v => (
					<BlockListTableRow blockData={v} />
				))}
			</TableBody>
		),
		[state.pageData]
	);

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
						Fee
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

	return useMemo(
		() => (
			<div className={cx("tableWrapper")}>
				<Table className={cx("table")}>
					{tableHeaderRender}
					{tableBodyRender}
				</Table>
				{footerRender}
			</div>
		),
		[state.pageData, lock]
	);
}
