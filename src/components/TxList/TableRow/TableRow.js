import React from "react";
import customStyle from "./TableRow.scss";
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";

import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {setAgoTime} from "src/lib/scripts";

import pickData, {CELL_TYPES} from "./pickData";

const cx = classNames.bind(customStyle);

export const TableRowThin = ({blockData}) => {
	return (
		<div className={cx("TxList-thinTableRow")}>
			<ul className={cx("row", "text")}>
				<li>Tx Hash</li>
				<li>{pickData(blockData, cx, "Tx Hash")}</li>
			</ul>
			<ul className={cx("row", "text")}>
				<li>Type</li>
				<li>{pickData(blockData, cx, "Type")}</li>
			</ul>
			<ul className={cx("row")}>
				<li>Address</li>
				<li className={cx("flexit")}>
					{pickData(blockData, cx, CELL_TYPES[2])}
					{pickData(blockData, cx, CELL_TYPES[3])}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>Value</li>
				<li>
					{pickData(blockData, cx, CELL_TYPES[4])} {pickData(blockData, cx, CELL_TYPES[5])}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>height</li>
				<li>
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
				<li>Time</li>
				<li>{blockData.timestamp ? setAgoTime(blockData.timestamp) : <Skeleton />}</li>
			</ul>
		</div>
	);
};

export default function({blockData}) {
	return (
		<TableRow className={cx("TxList-tableRow")} hover={true} key={blockData.id}>
			<TableCell className={cx("tablePointerCell", "text", "txCell")} component='th' scope='row'>
				{pickData(blockData, cx, CELL_TYPES[0])}
			</TableCell>
			<TableCell className={cx("tablePointerCell", "text")}>{pickData(blockData, cx, CELL_TYPES[1])}</TableCell>
			<TableCell className={cx("tablePointerCell", "text", "addrWidth")} align='left'>
				<span className={cx("flexit")}>
					{pickData(blockData, cx, CELL_TYPES[2])}
					{pickData(blockData, cx, CELL_TYPES[3])}
				</span>
			</TableCell>
			<TableCell className={cx("tableCell", "valueCell", "padding-right10")} align='right'>
				{pickData(blockData, cx, CELL_TYPES[4])}
			</TableCell>
			<TableCell className={cx("tablePointerMiniCell", "padding-left10")} align='left'>
				{pickData(blockData, cx, CELL_TYPES[5])}
			</TableCell>
			<TableCell className={cx("tablePointerMiniCell")} align='right'>
				{blockData.height ? (
					<NavLink className={cx("blueColor")} to={`/blocks/${blockData.height}`}>
						{blockData.height}{" "}
					</NavLink>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tableCell")} align='right'>
				{blockData.timestamp ? setAgoTime(blockData.timestamp) : <Skeleton />}
			</TableCell>
		</TableRow>
	);
}
