import React from "react";
import customStyle from "./TableRow.scss";
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";

import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {reduceString, setAgoTime} from "src/lib/scripts";

const cx = classNames.bind(customStyle);

export default function({blockData}) {
	return (
		<TableRow className={cx("tableRow")} hover={true} key={blockData.id}>
			<TableCell className={cx("tablePointerCell", "text")} component='th' scope='row'>
				{blockData.height ? (
					<NavLink className={cx("blueColor")} to={`/blocks/${blockData.height}`}>
						{blockData.height}{" "}
					</NavLink>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tablePointerCell", "text")}>
				{blockData.parent_hash ? (
					<NavLink className={cx("blueColor")} to={`/blocks/${blockData.height}`}>
						{reduceString(blockData.parent_hash, 12, 8)}
					</NavLink>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tablePointerCell", "text")} align='left'>
				{blockData.moniker ? (
					<NavLink to={`/validators/${blockData.proposer}`}>{blockData.moniker}</NavLink>
				) : // <Skeleton />
				null}
			</TableCell>
			<TableCell className={cx("tableCell", "text")} align='right'>
				000,000.<span className={"decimal"}>00000</span>
				<span className={"BNB"}>BNB</span>
			</TableCell>
			<TableCell className={cx("tableCell")} align='right'>
				{blockData.num_txs}
			</TableCell>
			<TableCell className={cx("tableCell")} align='right'>
				{blockData.timestamp ? setAgoTime(blockData.timestamp) : <Skeleton />}
			</TableCell>
		</TableRow>
	);
}
