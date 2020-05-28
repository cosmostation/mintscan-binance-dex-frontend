import * as React from "react";
import styles from "./TxInfo.scss";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";

import {getTotalTime, setAgoTime} from "src/lib/scripts";
//  components
import InfoRow from "src/components/common/InfoRow";
import DisplayLongString from "src/components/common/DisplayLongString";
//  assets
import failSVG from "src/assets/transactions/fail_ic.svg";
import successSVG from "src/assets/transactions/success_ic.svg";

const cx = cn.bind(styles);

export default function({txData}) {
	return (
		<div className={cx("TxInfo-wrapper")}>
			<h2 className={cx("title")}>Information</h2>
			<div className={cx("grid-wrapper")}>
				<InfoRow label='TxHash'>
					<DisplayLongString inputString={txData.tx_hash} long />
				</InfoRow>
				<InfoRow label='Status'>
					<span>
						<img className={cx("status-img")} src={txData?.result ? successSVG : failSVG} alt={"status"} />
						{txData?.result ? "Success" : "fail"}
					</span>
				</InfoRow>
				<InfoRow label='Height'>
					<NavLink className={cx("blueColor")} to={`/blocks/${txData.height}`}>
						{txData.height}
					</NavLink>
				</InfoRow>
				<InfoRow label='Time'>
					<span>
						{setAgoTime(txData.timestamp)} ( {getTotalTime(txData.timestamp)} )
					</span>
				</InfoRow>
			</div>
		</div>
	);
}
