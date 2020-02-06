import React, {Component} from "react";
import PropTypes from "prop-types";
import customStyle from "./TableRow.scss";
import classNames from "classnames/bind";

import {NavLink} from "react-router-dom";

import {TableCell, TableRow} from "@material-ui/core";
import * as isEqual from "fast-deep-equal";

import Skeleton from "react-skeleton-loader";

const cx = classNames.bind(customStyle);

export default function(props) {
	return (
		<TableRow className={cx("tableRow")} hover={true} key={blockData.id}>
			<TableCell className={cx("tablePointerCell")} component='th' scope='row'>
				{blockData.height ? <NavLink to={`/blocks/${blockData.height}`}>{blockData.height} </NavLink> : <Skeleton />}
			</TableCell>
			<TableCell className={cx("tablePointerCell")}>
				{blockData.hash ? <NavLink to={`/blocks/${blockData.height}`}>{scripts.ellipsisString(blockData.hash, 12, 8)}</NavLink> : <Skeleton />}
			</TableCell>
			<TableCell className={cx("tablePointerMiniCell")}>
				{blockData.proposerMoniker ? (
					<NavLink to={`/validators/${blockData.proposerAddr}`}>{blockData.proposerMoniker}</NavLink>
				) : // <Skeleton />
				null}
			</TableCell>
			<TableCell className={cx("tableCell")} align='right'>
				{blockData.numOfTxs}
			</TableCell>
			<TableCell className={cx("tableCell")} align='right'>
				{blockData.time ? blockData.time : <Skeleton />}
			</TableCell>
		</TableRow>
	);
}
