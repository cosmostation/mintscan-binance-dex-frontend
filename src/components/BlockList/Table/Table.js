import React from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";

//  utils
import {omitProperty, recursiveExpand} from "src/lib/scripts";
import consts from "src/constants/consts";
import useIndexedPagination from "src/components/common/hooks/useIndexedPagination";

// components
import {Table, TableBody, TableCell, TableFooter, TableRow, TableHead, Tooltip, Fade} from "@material-ui/core";

import tooltips from "src/constants/tooltips";

const cx = classNames.bind(styles);

export default function(props) {
	const [loading, error, state, updateCurrentPage] = useIndexedPagination({
		path: consts.API.BLOCKLIST,
		pageSize: 20,
		initialHeight: 0,
		baseProperty: "height",
		limit: 60,
		resolve: arr => omitProperty(arr, ["id"]),
		updateQuery: "height",
	});
	const imsiButtonPress = (bool = false) => {
		updateCurrentPage(bool);
		console.log("clicked next");
	};
	console.log("state", state);
	return (
		<div className={cx("tableWrapper")}>
			<Table className={cx("table")}>
				<TableHead>
					<TableRow>
						<TableCell className={cx("tableHeaderCell", "heightWidth")}>Height</TableCell>
						<TableCell className={cx("tableHeaderCell")}>Parent Hash</TableCell>
						<TableCell className={cx("tableHeaderCell")}>
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
				{/*<TableBody>*/}
				add table rows
				<button onClick={() => imsiButtonPress(false)}>GETMORERIGHT</button>
				<button onClick={() => imsiButtonPress(true)}>GETMORELEFT</button>
				<p>{state.pageData ? recursiveExpand(state.pageData, "") : "none"}</p>
				{/*</TableBody>*/}
				<TableFooter className={cx("table-footer")}>
					<TableRow>add table pagination</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
