import React from "react";
import cn from "classnames/bind";
import styles from "./AssetTxs.scss";
import {_, empty} from "src/lib/scripts";
import TxTable from "./TxTable";
import AssetsTable from "src/components/Account/AssetTxs/AssetsTable";

const cx = cn.bind(styles);

export default function({balances = [], address = ""}) {
	const [selected, setSelected] = React.useState(true);
	const onClick = React.useCallback((e, bool) => {
		e.stopPropagation();
		e.preventDefault();
		setSelected(bool);
	}, []);

	const txTable = React.useMemo(() => <TxTable address={address ? address : ""} />, [address]);

	const assetTable = React.useMemo(() => <AssetsTable balances={balances ? balances : []} />, [balances]);

	return (
		<div className={cx("AssetTxs-wrapper")}>
			<div className={cx("Tabs")}>
				<div className={cx("Tab", selected ? "selected" : undefined)} onClick={e => onClick(e, true)}>
					Assets
				</div>
				<div className={cx("Tab", !selected ? "selected" : undefined)} onClick={e => onClick(e, false)}>
					Transactions
				</div>
			</div>
			<div className={cx("Card")}>
				<div className={cx(selected ? undefined : "unselected")}>{assetTable}</div>
				<div className={cx(!selected ? undefined : "unselected")}>{txTable}</div>
			</div>
		</div>
	);
}
