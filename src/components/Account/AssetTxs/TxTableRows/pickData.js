import React from "react";
import {_, formatNumber, reduceString, refineAddress} from "src/lib/scripts";
import {fixed} from "src/lib/Big";
import getTxType from "src/constants/getTxType";
import {NavLink} from "react-router-dom";
//  components
import Skeleton from "react-skeleton-loader";
import Decimal from "src/components/common/Decimal";
//  assets
import greenArrowSVG from "src/assets/common/transferarrow_gr.svg";
import redArrowSVG from "src/assets/common/transferarrow_rd.svg";

export default function(data, cx, cell, account) {
	switch (cell) {
		case "txType": {
			if (!_.isNil(data?.txType)) return <span className={cx("type")}>{getTxType(data?.txType)}</span>;
			return <Skeleton />;
		}
		case "address": {
			if (data?.txType === "TRANSFER") {
				if (data.fromAddr === "") {
					return <span>Multi send</span>;
				}
				const senderIsAcc = data.fromAddr === account;
				const baseAddr = refineAddress(senderIsAcc ? data.toAddr : data.fromAddr);
				return (
					<NavLink className={cx("NavLink")} to={`/account/${baseAddr}`}>
						<img src={senderIsAcc ? redArrowSVG : greenArrowSVG} alt={"arrow"} />
						<span>{reduceString(baseAddr, 6, 6)}</span>
					</NavLink>
				);
			} else {
				//  No clickable since it's the same address
				return (
					<div>
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
