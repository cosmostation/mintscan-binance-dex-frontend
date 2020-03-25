import React from "react";
import styles from "./TxTableRows.scss";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";
import {reduceString, setAgoTime} from "src/lib/scripts";

//  components
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";

import pickData from "./pickData";
import {CELL_TYPES} from "src/components/TxList/TableRow/pickData";

const cx = cn.bind(styles);

export default function({data}) {
	console.log(data);
	return (
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
			<TableCell className={cx("tablePointerCell", "text")}>{pickData(data, cx, "txType")}</TableCell>
			<TableCell className={cx("tablePointerCell", "text", "addrWidth")} align='left'>
				{pickData(data, cx, "address")}
			</TableCell>
			<TableCell className={cx("tableCell", "valueCell", "padding-right10")} align='right'>
				data
			</TableCell>
			<TableCell className={cx("tablePointerMiniCell", "padding-left10")} align='left'>
				data
			</TableCell>
			<TableCell className={cx("tablePointerMiniCell")} align='right'>
				{data.blockHeight ? (
					<NavLink className={cx("blueColor")} to={`/blocks/${data.blockHeight}`}>
						{data.blockHeight}
					</NavLink>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tableCell")} align='right'>
				{data.timeStamp ? setAgoTime(data.timeStamp) : <Skeleton />}
			</TableCell>
		</TableRow>
	);
}
