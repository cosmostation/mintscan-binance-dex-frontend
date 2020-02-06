import React from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";

//  utils
import _ from "lodash";
import consts from "src/constants/consts";
import IndexedPagination from "src/components/common/hooks/IndexedPagination";

// components
import {Table, TableBody, TableCell, TableFooter, TablePagination, TableRow, TableHead, Tooltip, Fade} from "@material-ui/core";

import tooltips from "src/constants/tooltips";

const cx = classNames.bind(styles);

export default function(props) {
	const [loading, error, pages, currentPage, setCurrentPage] = IndexedPagination(consts.API.BLOCKLIST, 20, 1, "height", 100, null);
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
				<TableBody>
					add table rows
					{/*{rows.map(row => {*/}
					{/*	return <BlockListTableRow blockData={row} key={row.id} />;*/}
					{/*})}*/}
				</TableBody>
				<TableFooter className={cx("table-footer")}>
					<TableRow>add table pagination</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
