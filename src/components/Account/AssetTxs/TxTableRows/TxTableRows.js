import React from "react";
import styles from "./TxTableRows.scss";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";
import {reduceString, setAgoTime} from "src/lib/scripts";
//  components
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";

import pickData from "./pickData";

const cx = cn.bind(styles);

export default function({data, account = ""}) {
	return React.useMemo(
		() => (
			<TableRow className={cx("TxTableRow-wrapper")} hover={true} key={data.id}>
				<TableCell className={cx("tablePointerCell", "text", "txCell")} component='th' scope='row'>
					{data.txHash ? (
						<NavLink className={cx("blueColor")} to={`/txs/${data.txHash}`}>
							{reduceString(data.txHash, 6, 6)}
						</NavLink>
					) : (
						<Skeleton />
					)}
				</TableCell>
				<TableCell className={cx("tableCell", "text")}>{data.txHash ? pickData(data, cx, "txType", account) : undefined}</TableCell>
				<TableCell className={cx("tableCell", "text", "addrWidth")} align='left'>
					{pickData(data, cx, "address", account)}
				</TableCell>
				<TableCell className={cx("tableCell", "valueCell", "padding-right10")} align='right'>
					{pickData(data, cx, "Value", account)}
				</TableCell>
				<TableCell className={cx("tableCell", "text", "padding-left10")} align='left'>
					{pickData(data, cx, "Currency", account)}
				</TableCell>
				<TableCell className={cx("tableCell")} align='right'>
					{data.blockHeight ? (
						<NavLink className={cx("blueColor", "text")} to={`/blocks/${data.blockHeight}`}>
							{data.blockHeight}
						</NavLink>
					) : (
						<Skeleton />
					)}
				</TableCell>
				<TableCell className={cx("tableCell", "text")} align='right'>
					{data.timeStamp ? setAgoTime(data.timeStamp) : <Skeleton />}
				</TableCell>
			</TableRow>
		),
		[account, data]
	);
}
