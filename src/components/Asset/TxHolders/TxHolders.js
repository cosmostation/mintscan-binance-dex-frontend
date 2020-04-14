import React from "react";
import cn from "classnames/bind";
import styles from "./TxHolders.scss";
//  components
import HoldersTable from "./HoldersTable";
import TxTable from "./TxTable";

const cx = cn.bind(styles);

export default function TxHolders({asset = ""}) {
	const [selected, setSelected] = React.useState(false);
	const onClick = React.useCallback((e, bool) => {
		e.stopPropagation();
		e.preventDefault();
		setSelected(bool);
	}, []);

	const txTable = React.useMemo(() => <TxTable asset={asset} selected={selected} />, [asset, selected]);

	const holdersTable = React.useMemo(() => <HoldersTable asset={asset} />, [asset]);

	return (
		<div className={cx("TxHolders-wrapper")}>
			<div className={cx("Tabs")}>
				<div className={cx("Tab", !selected ? "selected" : undefined)} onClick={e => onClick(e, false)}>
					Holders
				</div>
				<div className={cx("Tab", selected ? "selected" : undefined)} onClick={e => onClick(e, true)}>
					Transactions
				</div>
			</div>
			<div className={cx("Card")}>
				<div className={cx(selected ? undefined : "unselected")}>{txTable}</div>
				<div className={cx(!selected ? undefined : "unselected")}>{holdersTable}</div>
			</div>
		</div>
	);
}

// const notUsed = (
// 			<div className={cx("TxHolders-wrapper")}>
// 				<div className={cx("Card", selected ? "selected" : "unselected")} onClick={e => onClick(e, true)}>
// 					<div className={cx("preventClick", selected ? "selected" : undefined)} onClick={e => e.preventDefault()}/>
// 					<div className={cx("grid", "expand-right")}>
// 						<div className={cx("content-wrapper")}>
// 							<div className={cx("title")}>
// 								TRANSACTIONS
// 							</div>
// 							{txTable}
// 						</div>
// 						<div className={cx("expand")}>
// 							<SvgDisplay />
// 						</div>
// 					</div>
// 				</div>
// 				<div className={cx("Card", !selected ? "selected" : "unselected")} onClick={e => onClick(e, false)}>
// 					<div className={cx("preventClick", !selected ? "selected" : undefined)} onClick={e => e.preventDefault()}/>
// 					<div className={cx("grid", "expand-left")}>
// 						<div className={cx("expand")}>
// 							<SvgDisplay customClass={"upsideDown"}/>
// 						</div>
// 						<div className={cx("content-wrapper")}>
// 							<div className={cx("title")}>
// 								HOLDERS
// 							</div>
// 							{holdersTable}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// );
