import React, {useMemo} from "react";
import cn from "classnames/bind";
import styles from "./TxTable.scss";
import {_, empty} from "src/lib/scripts";
import consts from "src/constants/consts";

//  components
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import TxTableRows from "../TxTableRows";

const cx = cn.bind(styles);

export default function({txData = []}) {
	const tableBodyRender = useMemo(() => {
		return (
			<TableBody>
				{_.map(empty(txData) ? Array.from({length: consts.NUM.PAGE_SIZE}, (z, idx) => ({id: idx})) : txData, (v, idx) => (
					<TxTableRows data={v} key={idx} />
				))}
			</TableBody>
		);
	}, [txData]);

	return (
		<div className={cx("TxTable-wrapper")}>
			{empty(txData) ? (
				<div>Loading or none</div>
			) : (
				<>
					<Table className={cx("table")}>
						{tableHeaderRender}
						{tableBodyRender}
						{/*<TableBody>{tableBodyRender}</TableBody>*/}
					</Table>
				</>
			)}
		</div>
	);
}

const tableHeaderRender = (
	<TableHead>
		<TableRow>
			<TableCell className={cx("tableHeaderCell", "txHashWidth")}>Tx Hash</TableCell>
			<TableCell className={cx("tableHeaderCell")}>Type</TableCell>
			<TableCell className={cx("tableHeaderCell", "addrWidth")} align='left'>
				Address
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "padding-right10")} align='right'>
				Value
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "padding-left10", "currencyWidth")} align='left'>
				Currency
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "heightWidth")} align='right'>
				<span>Height</span>
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "txsWidth")} align='right'>
				<span>Time</span>
			</TableCell>
		</TableRow>
	</TableHead>
);
