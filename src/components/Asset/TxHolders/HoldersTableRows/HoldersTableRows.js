import React from "react";
import cn from "classnames/bind";
import styles from "./HoldersTableRows.scss";

import {_, formatNumber, reduceString, refineAddress} from "src/lib/scripts";
//  components
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {NavLink} from "react-router-dom";
import {fixed, multiply} from "src/lib/Big";

const cx = cn.bind(styles);

export const ThinTableRows = ({holder = {}, rank = null}) => {
	const formattedQuantity = !_.isNil(holder.quantity) ? formatNumber(fixed(holder.quantity, 2)).split(".") : undefined;
	const formattedPercentage = !_.isNil(holder.percentage)
		? holder.percentage === 0
			? ["<0", "01"]
			: formatNumber(fixed(multiply(holder.percentage, 100), 2)).split(".")
		: undefined;
	return (
		<div className={cx("AssetHoldersList-thinTableRow")}>
			<div className={cx("divider")} />
			<ul className={cx("section-wrapper")}>
				<li>
					{rank ? (
						<div className={cx("rank", rank <= 3 ? "highRank" : undefined)}>
							<span>{rank}</span>
						</div>
					) : (
						<Skeleton />
					)}
				</li>
				<li>
					{holder?.address ? (
						<NavLink className={cx("blueColor")} to={`/account/${refineAddress(holder?.address)}`}>
							{reduceString(refineAddress(holder?.address), 6, 6)}
						</NavLink>
					) : (
						<Skeleton />
					)}
				</li>
			</ul>
			<div className={cx("divider")} />
			<div className={cx("content")}>
				<ul className={cx("row")}>
					<li>Quantity</li>
					<li>
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
							<Skeleton width={"100px"} widthRandomness={0} />
						)}
					</li>
				</ul>
				<ul className={cx("row")}>
					<li>Percentage</li>
					<li>
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
							<Skeleton width={"100px"} widthRandomness={0} />
						)}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default function HoldersTableRows({holder = {}, rank = null}) {
	const formattedQuantity = !_.isNil(holder.quantity) ? formatNumber(fixed(holder.quantity, 2)).split(".") : undefined;
	const formattedPercentage = !_.isNil(holder.percentage)
		? holder.percentage === 0
			? ["<0", "01"]
			: formatNumber(fixed(multiply(holder.percentage, 100), 2)).split(".")
		: undefined;
	return (
		<TableRow className={cx("HoldersTableRows-wrapper")} hover={true} key={holder.address}>
			<TableCell className={cx("tableCell", "text", "rankPadding")} component='th' scope='row' align='center'>
				{rank ? (
					<div className={cx("rank", rank <= 3 ? "highRank" : undefined)}>
						<span>{rank}</span>
					</div>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row'>
				{holder.address ? (
					<NavLink className={cx("blueColor")} to={`/account/${refineAddress(holder.address)}`}>
						{reduceString(refineAddress(holder.address), 6, 6)}
					</NavLink>
				) : (
					<Skeleton width={"80px"} widthRandomness={0} />
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
					<Skeleton width={"100px"} widthRandomness={0} />
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
					<Skeleton width={"100px"} widthRandomness={0} />
				)}
			</TableCell>
		</TableRow>
	);
}
