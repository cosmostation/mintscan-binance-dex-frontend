import React from "react";
import cn from "classnames/bind";
import styles from "./HoldersTable.scss";
import consts from "src/constants/consts";
import {useFetch, useTimer} from "src/hooks";

//  components
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {_, empty} from "src/lib/scripts";
import HoldersTableRows from "../HoldersTableRows";

const cx = cn.bind(styles);

export default function HoldersTable({asset=""}) {
	// TODO
	//  work on this when API is upgraded to accomodate more
	// const [fetchState] = usePagedPagination({path: `${consts.API.ASSET_HOLDERS}`});
	const [state, refetch, setUrl] = useFetch(`${consts.API_BASE}${consts.API.ASSET_HOLDERS}`);
	const [timer] = useTimer(true, consts.NUM.ASSET_REFETCH_INTERVAL_MS);

	React.useEffect(() => {
		if(empty(asset)) return;
		setUrl(`${consts.API_BASE}${consts.API.ASSET_HOLDERS}${asset}`);
	}, [asset, setUrl]);
	const tableBodyRender = React.useMemo(() => {
		return (
			<>
				{empty(state.data) ? _.map(Array.from({length: 20}, () => {}), v => <HoldersTableRows asset={v}/>)
					: _.map(state.data.addressHolders, (v,i) => <HoldersTableRows rank={i+1} holder={v}/>)}
			</>
		)
	}, [state.data]);

	return (
		<div className={cx("HoldersTable-wrapper")}>
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
	<TableHead>
		<TableRow>
			<TableCell className={cx("tableHeaderCell", "rank")} align='center'>
				Rank
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "proposer")} align='left'>
				Address
			</TableCell>
			<TableCell className={cx("tableHeaderCell")} align='right'>
				Quantity
			</TableCell>
			<TableCell className={cx("tableHeaderCell", "Percentage")} align='right'>
				Percentage
			</TableCell>
		</TableRow>
	</TableHead>
);