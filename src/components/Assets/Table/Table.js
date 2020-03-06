import React, {useEffect, useMemo} from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";

import {InputBase, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const cx = classNames.bind(styles);

export default function(props) {
	const tableBodyRender = useMemo(() => {
		return <TableBody>fill</TableBody>;
	}, []);

	const tableHeaderRender = useMemo(
		() => (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell")}>Name</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						Market Cap(USD)
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						Price
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						Supply
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "OwnerCell")} align='left'>
						Owner
					</TableCell>
				</TableRow>
			</TableHead>
		),
		[]
	);

	return (
		<div className={cx("AssetsTable-wrapper")}>
			<div className={cx("search-wrapper")}>
				<div className={cx("search")}>
					<InputBase className={cx("input")} placeholder='Search assets' onKeyPress={() => {}} onChange={() => {}} />
				</div>
				<button className={cx("searchBtn")} onClick={() => {}}>
					Search
				</button>
			</div>
			<Table className={cx("table")}>
				{tableHeaderRender}
				{tableBodyRender}
			</Table>
		</div>
	);
}
