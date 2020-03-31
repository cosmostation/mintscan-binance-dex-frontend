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

export const ThinTableRow = ({data, account = ""}) => {
	return React.useMemo(
		() => (
			<div className={cx("TxThinTableRow-wrapper")}>
				<ul className={cx("row", "text")}>
					<li>Tx Hash</li>
					<li>
						{data.txHash ? (
							<NavLink className={cx("blueColor")} to={`/txs/${data.txHash}`}>
								{reduceString(data.txHash, 6, 6)}
							</NavLink>
						) : (
							<Skeleton />
						)}
					</li>
				</ul>
				<ul className={cx("row", "text")}>
					<li>Type</li>
					<li>{pickData(data, cx, "txType", account)}</li>
				</ul>
				<ul className={cx("row", "text")}>
					<li>Address</li>
					<li>{pickData(data, cx, "address", account)}</li>
				</ul>
				<ul className={cx("row", "text")}>
					<li>Value</li>
					<li className={cx("flexIt")}>
						{pickData(data, cx, "Value", account)} {pickData(data, cx, "Currency", account)}
					</li>
				</ul>
				<ul className={cx("row", "text")}>
					<li>Height</li>
					<li>
						{data.blockHeight ? (
							<NavLink className={cx("blueColor", "text")} to={`/blocks/${data.blockHeight}`}>
								{data.blockHeight}
							</NavLink>
						) : (
							<Skeleton />
						)}
					</li>
				</ul>
				<ul className={cx("row", "text")}>
					<li>Time</li>
					<li>{data.timeStamp ? setAgoTime(data.timeStamp) : <Skeleton />}</li>
				</ul>
			</div>
		),
		[data, account]
	);
};

export default function({data, account = ""}) {
	return React.useMemo(
		() => (
			<TableRow className={cx("TxTableRow-wrapper")} hover={true} key={data.id}>
				<TableCell className={cx("tablePointerCell", "txHash", "text")} component='th' scope='row'>
					{data.txHash ? (
						<NavLink className={cx("blueColor")} to={`/txs/${data.txHash}`}>
							{reduceString(data.txHash, 6, 6)}
						</NavLink>
					) : (
						<Skeleton />
					)}
				</TableCell>
				<TableCell className={cx("tableCell", "text", "padding-right10", "padding-left10")}>
					{data.txHash ? pickData(data, cx, "txType", account) : undefined}
				</TableCell>
				<TableCell className={cx("tableCell", "text", "addrWidth", "padding-right10")} align='left'>
					{pickData(data, cx, "address", account)}
				</TableCell>
				<TableCell className={cx("tableCell", "valueCell", "padding-right10", "padding-left10")} align='right'>
					{pickData(data, cx, "Value", account)}
				</TableCell>
				<TableCell className={cx("tableCell", "text", "padding-left10")} align='left'>
					{pickData(data, cx, "Currency", account)}
				</TableCell>
				<TableCell className={cx("tableCell", "padding-left10")} align='right'>
					{data.blockHeight ? (
						<NavLink className={cx("blueColor", "text")} to={`/blocks/${data.blockHeight}`}>
							{data.blockHeight}
						</NavLink>
					) : (
						<Skeleton />
					)}
				</TableCell>
				<TableCell className={cx("tableCell", "text", "padding-left10")} align='right'>
					{data.timeStamp ? setAgoTime(data.timeStamp) : <Skeleton />}
				</TableCell>
			</TableRow>
		),
		[account, data]
	);
}
