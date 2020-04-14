import * as React from "react";
import cn from "classnames/bind";
import styles from "./TableRow.scss";
import {NavLink} from "react-router-dom";
//  redux
import {useSelector} from "react-redux";
//  components
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {setAgoTime} from "src/lib/scripts";

const cx = cn.bind(styles);

export default function({blockData}) {
	const validators = useSelector(state => state.blockchain.validators);
	return (
		<TableRow className={cx("BlocksDisplay-tableRow")} hover={true} key={blockData.id}>
			<TableCell className={cx("tablePointerCell", "text")} component='th' scope='row'>
				{blockData.height ? (
					<NavLink className={cx("blueColor")} to={`/blocks/${blockData.height}`}>
						{blockData.height}{" "}
					</NavLink>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tablePointerCell", "text", "proposer")} align='left'>
				{blockData.moniker ? (
					<NavLink className={cx("blueColor")} to={`/account/${validators[blockData.moniker]?.accountAddr}`}>
						{blockData.moniker}
					</NavLink>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tableCell")} align='right'>
				{blockData.height ? blockData.num_txs ? blockData.num_txs : "0" : <Skeleton />}
			</TableCell>
			<TableCell className={cx("tableCell", "time")} align='right'>
				{blockData.timestamp ? <>{setAgoTime(blockData.timestamp)}</> : <Skeleton />}
			</TableCell>
		</TableRow>
	);
}
