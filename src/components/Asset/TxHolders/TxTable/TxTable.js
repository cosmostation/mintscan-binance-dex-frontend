import React from "react";
import cn from "classnames/bind";
import styles from "./TxTable.scss";

import consts from "src/constants/consts";
import {_, empty} from "src/lib/scripts";
import {useFetch, useHistory, useTimer} from "src/hooks";
//  components
import TxTableRows, {ThinTableRow} from "../TxTableRows";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

const cx = cn.bind(styles);

export default function TxTable({asset = ""}) {
	// TODO
	//  work on this when API is upgraded to accomodate more
	// const [fetchState] = usePagedPagination({path: `${consts.API_BASE}${consts.API.ASSET_TXS}${asset}`});
	const history = useHistory();
	const [state, refetch, setUrl] = useFetch("");
	const [timer] = useTimer(true, consts.NUM.ASSET_REFETCH_INTERVAL_MS);

	React.useEffect(() => {
		if (empty(asset)) return;
		setUrl(`${consts.API_BASE}${consts.API.ASSET_TXS}${asset}`);
	}, [asset, setUrl, history.action]);

	React.useEffect(() => {
		if (empty(asset)) return;
		refetch();
		// eslint-disable-next-line
	}, [refetch, timer]);

	React.useEffect(() => {
		if (history.action !== "PUSH") return;
		setUrl(`${consts.API_BASE}${consts.API.ASSET_TXS}${asset}`);
	}, [history.action, asset, setUrl]);

	const tableBodyRender = React.useMemo(() => {
		return (
			<>
				{empty(state.data)
					? _.map(
							Array.from({length: 20}, () => ({})),
							(v, i) => <TxTableRows key={i} asset={v} />
					  )
					: _.map(state.data.txArray, (v, i) => <TxTableRows key={i} asset={v} />)}
			</>
		);
	}, [state.data]);

	const thinTableBodyRender = React.useMemo(() => {
		return (
			<div className={cx("thinTableWrapper")}>
				{empty(state.data)
					? _.map(
							Array.from({length: 20}, () => ({})),
							(v, i) => <ThinTableRow key={i} asset={v} />
					  )
					: _.map(state.data.txArray, (v, i) => <ThinTableRow key={i} asset={v} />)}
			</div>
		);
	}, [state.data]);

	return (
		<div className={cx("TxTable-wrapper")}>
			<Table className={cx("table")}>
				{tableHeaderRender}
				<TableBody>{tableBodyRender}</TableBody>
			</Table>
			{thinTableBodyRender}
		</div>
	);
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
