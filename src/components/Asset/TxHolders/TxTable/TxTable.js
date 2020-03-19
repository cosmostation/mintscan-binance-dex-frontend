import React from "react";
import cn from "classnames/bind";
import styles from "./TxTable.scss";

import consts from "src/constants/consts";
import {empty, _} from "src/lib/scripts";
import {useFetch, useTimer} from "src/hooks";

//  components
import TxTableRows from "../TxTableRows";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";



const cx = cn.bind(styles);

export default function TxTable({asset=""}) {
	// TODO
	//  work on this when API is upgraded to accomodate more
	// const [fetchState] = usePagedPagination({path: `${consts.API_BASE}${consts.API.ASSET_TXS}${asset}`});
	const [state, refetch, setUrl] = useFetch("");
	const [timer] = useTimer(true, consts.NUM.ASSET_REFETCH_INTERVAL_MS);

	React.useEffect(() => {
		if(empty(asset)) return;
		setUrl(`${consts.API_BASE}${consts.API.ASSET_TXS}${asset}`);
	}, [asset, setUrl]);

	React.useEffect(() => {
		if(empty(asset)) return;
		refetch();
		// eslint-disable-next-line
	}, [refetch, timer]);

	const tableBodyRender = React.useMemo(() => {
		return (
			<>
				{empty(state.data) ? _.map(Array.from({length: 20}, () => {}), v => <TxTableRows asset={v}/>)
					: _.map(state.data.txArray, v => <TxTableRows asset={v}/>)}
			</>
		)
	}, [state.data]);


	return (
		<div className={cx("TxTable-wrapper")}>
			<Table>
				{tableHeaderRender}
				<TableBody>
					{tableBodyRender}
				</TableBody>
			</Table>
		</div>
	)
}

const tableHeaderRender = (
	<TableHead className={cx("header")}>
		<TableRow className={cx("header")}>
			<TableCell className={cx("tableHeaderCell", "txHash")} align='left'>
				Tx Hash
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "type")} align='left'>
				Type
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "address")} align='left'>
				Address
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "value")} align='right'>
				Value
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "currency")} align='left'>
				Currency
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "time")} align='right'>
				Time
			</TableCell>
		</TableRow>
	</TableHead>
);