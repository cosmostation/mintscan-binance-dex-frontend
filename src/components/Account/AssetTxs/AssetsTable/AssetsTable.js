import React from "react";
import cn from "classnames/bind";
import styles from "./AssetTable.scss";
import {_, empty} from "src/lib/scripts";
//  components
import AssetsTableRows, {ThinTableRows} from "../AssetsTableRows";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import Spinner from "src/components/common/Spinner";

const cx = cn.bind(styles);

export default function({balances = [], prices = null}) {
	console.log(balances);
	const tableBodyRender = React.useMemo(
		() => (
			<>
				{_.map(balances, (v, i) => (
					<AssetsTableRows key={i} asset={v} price={prices?.[i]} />
				))}
			</>
		),
		[balances, prices]
	);

	const thinTableBodyRender = React.useMemo(
		() => (
			<div className={cx("thinTable")}>
				{_.map(balances, (v, i) => (
					<ThinTableRows key={i} asset={v} price={prices?.[i]} />
				))}
			</div>
		),
		[balances, prices]
	);

	return (
		<div className={cx("AssetsTable-wrapper")}>
			{empty(balances) ? (
				<Spinner />
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
			<TableCell className={cx("tableHeaderCell", "generalDecimals")} align='right'>
				Total Balance
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "estValue")} align='right'>
				Estimated Value($)
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "generalDecimals")} align='right'>
				Available
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "generalDecimals")} align='right'>
				Freeze
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "generalDecimals")} align='right'>
				In Order
			</TableCell>
		</TableRow>
	</TableHead>
);
