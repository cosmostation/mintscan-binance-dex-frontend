import React, {useMemo} from "react";
import cn from "classnames/bind";
import styles from "./TxTable.scss";
import {_, empty} from "src/lib/scripts";
import consts from "src/constants/consts";
//  components
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import TxTableRows, {ThinTableRow} from "../TxTableRows";
import Spinner from "src/components/common/Spinner/Spinner";

const cx = cn.bind(styles);

export default function({txData = [], account = ""}) {
	const tableBodyRender = useMemo(() => {
		return (
			<TableBody>
				{_.map(empty(txData) ? Array.from({length: consts.NUM.PAGE_SIZE}, (z, idx) => ({id: idx})) : txData, (v, idx) => (
					<TxTableRows data={v} key={idx} account={account} />
				))}
			</TableBody>
		);
	}, [txData, account]);

	const thinTableBodyRender = useMemo(() => {
		return (
			<div className={cx("thinTableWrapper")}>
				{_.map(empty(txData) ? Array.from({length: consts.NUM.PAGE_SIZE}, (z, idx) => ({id: idx})) : txData, (v, idx) => (
					<ThinTableRow data={v} key={idx} account={account} />
				))}
			</div>
		);
	}, [txData, account]);

	return (
		<div className={cx("TxTable-wrapper")}>
			{empty(txData) ? (
				<Spinner />
			) : (
				<>
					<Table className={cx("table")}>
						{tableHeaderRender}
						{tableBodyRender}
						{/*<TableBody>{tableBodyRender}</TableBody>*/}
					</Table>
					{thinTableBodyRender}
				</>
			)}
		</div>
	);
}

const tableHeaderRender = (
	<TableHead>
		<TableRow>
			<TableCell className={cx("tableHeaderCell", "txHashWidth")}>Tx Hash</TableCell>
			<TableCell className={cx("tableHeaderCell", "padding-right10", "padding-left10")}>Type</TableCell>
			<TableCell className={cx("tableHeaderCell", "addrWidth", "padding-right10")} align='left'>
				Address
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "padding-right10", "padding-left10")} align='right'>
				Value
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "padding-left10", "currencyWidth")} align='left'>
				Currency
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "heightWidth", "padding-left10")} align='right'>
				<span>Height</span>
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "txsWidth", "padding-left10")} align='right'>
				<span>Time</span>
			</TableCell>
		</TableRow>
	</TableHead>
);
