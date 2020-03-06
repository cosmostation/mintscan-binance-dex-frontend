import * as React from "react";
import cn from "classnames/bind";
import styles from "./BlockTxs.scss";

import {_, empty} from "src/lib/scripts";
//  components
import {Table, TableBody} from "@material-ui/core";
import NoTx from "src/components/common/NoTx";
import {txTableHeader} from "src/components/TxList/Table/Table";
import TxListTableRow, {TableRowThin} from "src/components/TxList/TableRow/TableRow";

const cx = cn.bind(styles);

export default function({txData}) {
	return (
		<div className={cx("BlockTxs-wrapper")}>
			<div className={cx("title")}>Transactions</div>
			{empty(txData) ? (
				<NoTx text={"No Transactions"} />
			) : (
				<>
					<Table className={cx("table")}>
						{txTableHeader}
						<TableBody>
							{_.map(txData, (v, i) => (
								<TxListTableRow key={i} blockData={v} />
							))}
						</TableBody>
					</Table>
					<div className={cx("thinTable")}>
						{_.map(txData, (v, i) => (
							<TableRowThin key={i} blockData={v} />
						))}
					</div>
				</>
			)}
		</div>
	);
}
