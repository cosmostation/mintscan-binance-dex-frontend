import React from "react";
import cn from "classnames/bind";
import styles from "./HoldersTableRows.scss";

import {_, formatNumber, reduceString, refineAddress, setAgoTime} from "src/lib/scripts";

//  components
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {NavLink} from "react-router-dom";
import {fixed} from "src/lib/Big";

const cx = cn.bind(styles);

export default function HoldersTableRows({holder={}, rank=null}) {
	const formattedQuantity = !_.isNil(holder.quantity) ? formatNumber(fixed(holder.quantity, 6)).split(".") : undefined;
	const formattedPercentage = !_.isNil(holder.percentage) ? formatNumber(fixed(holder.percentage, 6)).split(".") : undefined;
	return (
		<TableRow className={cx("HoldersTableRows-wrapper")} hover={true} key={holder.address}>
			<TableCell className={cx("tableCell", "text", "rankPadding")} component='th' scope='row' align="center">
				{rank ? <div className={cx("rank", rank <= 3 ? "highRank" : undefined)}><span>{rank}</span></div> : <Skeleton />}
			</TableCell>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row'>
				{holder.address ? (
					<NavLink className={cx("blueColor")} to={`/account/${holder.address}`}>
						{reduceString(holder.address, 6, 6)}
					</NavLink>
				) : (
					<Skeleton width={"80px"} widthRandomness={0}/>
				)}
			</TableCell>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row'>
				{formattedQuantity ? (
					<div className={cx("number-wrapper")}>
						{formattedQuantity[0]}
						{formattedQuantity[1] ? (
							<>
								.<span>{formattedQuantity[1]}</span>
							</>
						) : (
							undefined
						)}
					</div>
				) : (
					<Skeleton width={"100px"} widthRandomness={0}/>
				)}
			</TableCell>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row'>
				{formattedPercentage ? (
					<div className={cx("number-wrapper")}>
						{formattedPercentage[0]}
						{formattedPercentage[1] ? (
							<>
								.<span>{formattedPercentage[1]}%</span>
							</>
						) : (
							undefined
						)}
					</div>
				) : (
					<Skeleton width={"100px"} widthRandomness={0}/>
				)}
			</TableCell>
		</TableRow>
	)
}