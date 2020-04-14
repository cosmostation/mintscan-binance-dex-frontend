import React from "react";
import customStyle from "./TableRow.scss";
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";
import {reduceString, setAgoTime} from "src/lib/scripts";
//  redux
import {useSelector} from "react-redux";
//  components
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";

const cx = classNames.bind(customStyle);

export const TableRowThin = ({blockData}) => {
	const validators = useSelector(state => state.blockchain.validators);
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
					<li key={2}>
						{blockData.moniker ? <NavLink to={`/account/${validators[blockData.moniker].accountAddr}`}>{blockData.moniker}</NavLink> : <Skeleton />}
					</li>
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
	const validators = useSelector(state => state.blockchain.validators);
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
				{blockData.moniker ? <NavLink to={`/account/${validators[blockData.moniker].accountAddr}`}>{blockData.moniker}</NavLink> : <Skeleton />}
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
