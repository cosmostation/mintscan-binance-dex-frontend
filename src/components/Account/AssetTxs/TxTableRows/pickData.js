import React from "react";
import txTypes from "src/constants/txTypes";
import {_, formatNumber, reduceString, refineAddress} from "src/lib/scripts";
import {fixed} from "src/lib/Big";
import getTxType from "src/constants/getTxType";
import {NavLink} from "react-router-dom";
//  components
import Skeleton from "react-skeleton-loader";
import Decimal from "src/components/common/Decimal";

const greenArrowSVG = process.env.PUBLIC_URL + "/assets/icons/common/transferarrow_gr.svg";
const redArrowSVG = process.env.PUBLIC_URL + "/assets/icons/common/transferarrow_rd.svg";

const {DEX, COSMOS} = txTypes;
export default function(data, cx, cell, account) {
	switch (cell) {
		case "txType": {
			if (!_.isNil(data?.txType)) return <span className={cx("type")}>{getTxType(data?.txType)}</span>;
			return <Skeleton />;
		}
		case "address": {
			if (data?.txType === "TRANSFER") {
				if (data.fromAddr === "") {
					return <span className={cx("text")}>Multi send</span>;
				}
				const senderIsAcc = data.fromAddr === account;
				const baseAddr = refineAddress(senderIsAcc ? data.toAddr : data.fromAddr);
				return (
					<NavLink className={cx("NavLink")} to={`/account/${baseAddr}`}>
						<span>{reduceString(baseAddr, 6, 6)}</span>
						<img src={senderIsAcc ? redArrowSVG : greenArrowSVG} alt={"arrow"} />
					</NavLink>
				);
			} else {
				//  No clickable since it's the same address
				return (
					<div className={cx("NavLink")}>
						<span>{reduceString(data.fromAddr, 6, 6)}</span>
					</div>
				);
			}
		}
		case "Value": {
			return (
				<>
					{Number(data.value) !== 0 ? (
						<div className={cx("number-display")}>
							<Decimal value={formatNumber(fixed(data.value))} fontSizeBase={13} />
						</div>
					) : (
						"-"
					)}
				</>
			);
		}
		case "Currency": {
			return <span className={cx({BNB: data.txAsset === "BNB"}, "text")}>{data.txAsset}</span>;
		}
		default:
			return "DEFAULT";
	}
}
