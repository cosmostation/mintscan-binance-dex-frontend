import React from "react";
import cn from "classnames/bind";
import styles from "./QrModal.scss";
import ModalPortal from "src/components/common/Modal/Portal";

const cx = cn.bind(styles);
export default function QrModal(props) {
	return (
		<ModalPortal>
			<div className={cx("QrModal-wrapper")}></div>
		</ModalPortal>
	);
}
