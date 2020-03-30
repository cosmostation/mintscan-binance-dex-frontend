import React from "react";
import customStyle from "./TableRow.scss";
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";

import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {reduceString, setAgoTime} from "src/lib/scripts";
import {proposerAddress} from "src/constants/consts";

const cx = classNames.bind(customStyle);

export const TableRowThin = ({blockData}) => {
	return (
		<>
			<div key={blockData.height} className={cx("BlockList-thinTableRow")}>
				<ul className={cx("row")}>
					<li key={1}>Height</li>
					<li key={2}>
						{blockData.height ? (
							<NavLink className={cx("blueColor")} to={`/blocks/${blockData.height}`}>
								{blockData.height}{" "}
							</NavLink>
						) : (
							<Skeleton />
						)}
					</li>
				</ul>
				<ul className={cx("row")}>
					<li key={1}>Parent Hash</li>
					<li key={2}>
						{blockData.parent_hash ? (
							<NavLink className={cx("blueColor")} to={`/blocks/${blockData.height}`}>
								{reduceString(blockData.parent_hash, 6, 6)}
							</NavLink>
						) : (
							<Skeleton />
						)}
					</li>
				</ul>
				<ul className={cx("row")}>
					<li key={1}>Node</li>
					<li key={2}>{blockData.moniker ? <NavLink to={`/account/${proposerAddress[blockData.moniker]}`}>{blockData.moniker}</NavLink> : <Skeleton />}</li>
				</ul>
				<ul className={cx("row")}>
					<li key={1}>Txs</li>
					<li key={2}>{blockData.height ? blockData.num_txs ? blockData.num_txs : "0" : <Skeleton />}</li>
				</ul>
				<ul className={cx("row")}>
					<li key={1}>Time</li>
					<li key={2}>{blockData.timestamp ? setAgoTime(blockData.timestamp) : <Skeleton />}</li>
				</ul>
			</div>
		</>
	);
};

export default function({blockData}) {
	return (
		<TableRow className={cx("BlockList-tableRow")} hover={true} key={blockData.height}>
			<TableCell className={cx("tablePointerCell", "text")} component='th' scope='row'>
				{blockData.height ? (
					<NavLink className={cx("blueColor")} to={`/blocks/${blockData.height}`}>
						{blockData.height}{" "}
					</NavLink>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tablePointerCell", "text", "parentHashWidth")}>
				{blockData.parent_hash ? (
					<NavLink className={cx("blueColor")} to={`/blocks/${blockData.height}`}>
						{reduceString(blockData.parent_hash, 6, 6)}
					</NavLink>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tablePointerCell", "text")} align='left'>
				{blockData.moniker ? <NavLink to={`/account/${proposerAddress[blockData.moniker]}`}>{blockData.moniker}</NavLink> : <Skeleton />}
			</TableCell>
			<TableCell className={cx("tableCell", "text")} align='right'>
				000,000.<span className={cx("decimal")}>00000</span>
				<span className={cx("BNB")}> BNB</span>
			</TableCell>
			<TableCell className={cx("tableCell")} align='right'>
				{blockData.height ? blockData.num_txs ? blockData.num_txs : "0" : <Skeleton />}
			</TableCell>
			<TableCell className={cx("tableCell")} align='right'>
				{blockData.timestamp ? setAgoTime(blockData.timestamp) : <Skeleton />}
			</TableCell>
		</TableRow>
	);
}
