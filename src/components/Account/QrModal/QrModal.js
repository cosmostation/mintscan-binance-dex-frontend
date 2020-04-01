import React from "react";
import cn from "classnames/bind";
import QrCode from "qrcode.react";
import styles from "./QrModal.scss";

const cx = cn.bind(styles);
export default function QrModal({address, show}) {
	return (
		<>
			<div className={cx("QrModal-wrapper", {invisible: !show})}>
				<div className={cx("arrow", {invisible: !show})} />
				<div className={cx("QrModal-inner")}>{address ? <QrCode value={address} /> : undefined}</div>
			</div>
		</>
	);
}
