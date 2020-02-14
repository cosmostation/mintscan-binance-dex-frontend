import React from "react";
import customStyle from "./TableRow.scss";
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";

import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {reduceString, setAgoTime} from "src/lib/scripts";

import pickData, {CELL_TYPES} from "./pickData";
export const cxTableRow = classNames.bind(customStyle);

export default function({blockData}) {
	return (
		<TableRow className={cxTableRow("tableRow")} hover={true} key={blockData.id}>
			<TableCell className={cxTableRow("tablePointerCell", "text")} component='th' scope='row'>
				{pickData(blockData, CELL_TYPES[0])}
			</TableCell>
			<TableCell className={cxTableRow("tablePointerCell", "text")}>{pickData(blockData, CELL_TYPES[1])}</TableCell>
			<TableCell className={cxTableRow("tablePointerCell", "text")} align='left'>
				{pickData(blockData, CELL_TYPES[2])}
			</TableCell>
			<TableCell className={cxTableRow("tableCell", "text")} align='left'>
				{pickData(blockData, CELL_TYPES[3])}
			</TableCell>
			<TableCell className={cxTableRow("tableCell")} align='right'>
				{blockData.num_txs}
			</TableCell>
			<TableCell className={cxTableRow("tableCell")} align='right'>
				{blockData.height ? (
					<NavLink className={cxTableRow("blueColor")} to={`/blocks/${blockData.height}`}>
						{blockData.height}{" "}
					</NavLink>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cxTableRow("tableCell")} align='right'>
				{blockData.timestamp ? setAgoTime(blockData.timestamp) : <Skeleton />}
			</TableCell>
		</TableRow>
	);
}
