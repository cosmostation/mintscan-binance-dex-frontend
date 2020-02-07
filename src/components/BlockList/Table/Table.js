import React from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";

//  utils
import _ from "lodash";
import consts from "src/constants/consts";
import useIndexedPagination from "src/components/common/hooks/useIndexedPagination";

// components
import {Table, TableBody, TableCell, TableFooter, TableRow, TableHead, Tooltip, Fade} from "@material-ui/core";

import tooltips from "src/constants/tooltips";

const cx = classNames.bind(styles);

const indexConstants = {
	path: consts.API.BLOCKLIST,
	pageSize: 20,
	initialPage: 1,
	baseProperty: "height",
	limit: 60,
	resolve: undefined,
};

export default function(props) {
	const [loading, error, pages, currentPage, setCurrentPage] = useIndexedPagination(...indexConstants);
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
