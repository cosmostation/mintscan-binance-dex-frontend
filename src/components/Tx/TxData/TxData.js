import * as React from "react";
import styles from "./TxData.scss";
import cn from "classnames/bind";

import {_} from "src/lib/scripts";

import TxMessage from "./TxMessage";

const cx = cn.bind(styles);

export default function({txData}) {
	// console.log(txData);
	return (
		<div className={cx("MsgList-wrapper")}>
			<h2 className={cx("title")}>Msgs</h2>
			{_.map(txData.messages, (v, i) => (
				<TxMessage key={i} msg={v} txData={txData} />
			))}
		</div>
	);
}
