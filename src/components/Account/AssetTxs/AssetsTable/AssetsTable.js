import React from "react";
import cn from "classnames/bind";
import styles from "./AssetTable.scss";
import {_, empty} from "src/lib/scripts";

//  components
import AssetsTableRows, {ThinTableRows} from "../AssetsTableRows";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

const cx = cn.bind(styles);

export default function({balances = []}) {
	const tableBodyRender = React.useMemo(
		() => (
			<>
				{_.map(balances, (v, i) => (
					<AssetsTableRows key={i} asset={v} />
				))}
			</>
		),
		[balances]
	);

	const thinTableBodyRender = React.useMemo(
		() => (
			<div className={cx("thinTableWrapper")}>
				{_.map(balances, (v, i) => (
					<ThinTableRows key={i} asset={v} />
				))}
			</div>
		),
		[balances]
	);

	return (
		<div className={cx("AssetsTable-wrapper")}>
			{empty(balances) ? (
				<div>NONE!</div>
			) : (
				<>
					<Table className={cx("table")}>
						{tableHeaderRender}
						<TableBody>{tableBodyRender}</TableBody>
					</Table>
					{thinTableBodyRender}
				</>
			)}
		</div>
	);
}

const tableHeaderRender = (
	<TableHead className={cx("header")}>
		<TableRow className={cx("header")}>
			<TableCell className={cx("tableHeaderCell", "asset")} align='left'>
				Assets
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "totalBal")} align='right'>
				Total Balance
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "estValue")} align='right'>
				Estimated Value
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "available")} align='right'>
				Available
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "freeze")} align='right'>
				Freeze
			</TableCell>
		</TableRow>
	</TableHead>
);
