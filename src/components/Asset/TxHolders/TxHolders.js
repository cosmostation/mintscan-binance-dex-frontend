import React from "react";
import cn from "classnames/bind";
import styles from "./TxHolders.scss";

//  components
import SvgDisplay from "src/components/common/SvgDisplay";
import HoldersTable from "./HoldersTable";
import TxTable from "./TxTable";

const cx = cn.bind(styles);

export default function TxHolders({asset=""}) {
	const [selected, setSelected] = React.useState(true);
	const onClick = (e, bool) => {
		e.stopPropagation();
		e.preventDefault();
		setSelected(bool);
	};
	return (
		<div className={cx("TxHolders-wrapper")}>
			<div className={cx("Card", selected ? "selected" : "unselected")} onClick={e => onClick(e, true)}>
				<div className={cx("preventClick", selected ? "selected" : undefined)} onClick={e => e.preventDefault()}/>
				<div className={cx("grid", "expand-right")}>
					<div className={cx("content-wrapper")}>
						<div className={cx("title")}>
							TRANSACTIONS
						</div>
						<TxTable asset={asset}/>
					</div>
					<div className={cx("expand")}>
						<SvgDisplay />
					</div>
				</div>
			</div>
			<div className={cx("Card", !selected ? "selected" : "unselected")} onClick={e => onClick(e, false)}>
				<div className={cx("preventClick", !selected ? "selected" : undefined)} onClick={e => e.preventDefault()}/>
				<div className={cx("grid", "expand-left")}>
					<div className={cx("expand")}>
						<SvgDisplay customClass={"upsideDown"}/>
					</div>
					<div className={cx("content-wrapper")}>
						<div className={cx("title")}>
							HOLDERS
						</div>
						<HoldersTable asset={asset}/>
					</div>
				</div>
			</div>
		</div>
	)
}