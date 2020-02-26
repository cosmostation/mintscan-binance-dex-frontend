import * as React from "react";
import styles from "./TxInfo.scss";
import cn from "classnames/bind";

import {NavLink} from "react-router-dom";
import {setAgoTime, empty} from "src/lib/scripts";
import moment from "moment";
import getTxTypeIcon from "src/constants/getTxTypeIcon";
import getTxType from "src/constants/getTxType";

//  components
import InfoRow from "src/components/common/InfoRow";

const successSVG = process.env.PUBLIC_URL + "/assets/transactions/success_ic.svg";
const failSVG = process.env.PUBLIC_URL + "/assets/transactions/fail_ic.svg";
const cx = cn.bind("styles");

export default function({txData}) {
	console.log(txData.time);
	return (
		<div className={cx("TxInfo-wrapper")}>
			<h2 className={cx("title")}>Information</h2>
			<div className={cx("grid-wrapper")}>
				<InfoRow label='TxHash'>
					<span>{txData.txHash}</span>
				</InfoRow>
				<InfoRow label='Status'>
					<span>
						<img className={cx("status-img")} src={txData.status === "success" ? successSVG : failSVG} alt={"status"} />
						{txData.status}
					</span>
				</InfoRow>
				<InfoRow label='Height'>
					<NavLink className={cx("blueColor")} to={`/blocks/${txData.height}`}>
						{txData.height}
					</NavLink>
				</InfoRow>
				<InfoRow label='Time'>
					<span>
						{setAgoTime(txData.time * 1000)} ( {moment(txData.time * 1000).format("YYYY-MM-DD HH:MM:ss")} )
					</span>
				</InfoRow>
				<InfoRow label='Fee'>
					<span>
						{txData.fee} <span className={cx("BNBcolor")}>BNB</span>
					</span>
				</InfoRow>
				<InfoRow label='Asset'>
					<span>{txData.asset}</span>
				</InfoRow>
				<InfoRow label='Memo'>
					<span>{txData.memo}</span>
				</InfoRow>
				<InfoRow label='Transaction Type'>
					<img className={cx("txType-img")} src={getTxTypeIcon(txData.txType)} alt={"icon"} />
					{getTxType(txData.txType)}
				</InfoRow>
				<InfoRow label='From'>
					{empty(txData.from) ? (
						"-"
					) : (
						<NavLink className={cx("blueColor")} to={`/accounts/${txData.from}`}>
							{txData.from}
						</NavLink>
					)}
				</InfoRow>
				<InfoRow label='To'>
					{empty(txData.to) ? (
						"-"
					) : (
						<NavLink className={cx("blueColor")} to={`/accounts/${txData.to}`}>
							{txData.to}
						</NavLink>
					)}
				</InfoRow>
				<InfoRow label='Value'>
					<span>
						{txData.value} <span className={cx("BNBcolor")}>BNB</span>
					</span>
				</InfoRow>
			</div>
		</div>
	);
}
