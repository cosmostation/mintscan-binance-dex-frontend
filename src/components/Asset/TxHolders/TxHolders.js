import React from "react";
import cn from "classnames/bind";
import styles from "./TxHolders.scss";

const cx = cn.bind(styles);

export default function TxHolders(props) {
	const [selected, setSelected] = React.useState(true);
	return (
		<div className={cx("TxHolders-wrapper")}>
			<div className={cx("Card", selected ? "selected" : "unselected")} onClick={() => setSelected(v => !v)}>
				<div className={cx("title")}>
					TRANSACTIONS
				</div>
			</div>
			<div className={cx("Card", !selected ? "selected" : "unselected")} onClick={() => setSelected(v => !v)}>
				<div className={cx("title")}>
					HOLDERS
				</div>
			</div>
		</div>
	)
}