import * as React from "react";
import styles from "./TxData.scss";
import cn from "classnames/bind";

import consts from "src/constants/consts";
import {formatNumber, _, empty} from "src/lib/scripts";
import {divide, multiply} from "src/lib/Big";

//  components
import InfoRow from "src/components/common/InfoRow";
import getTxTypeIcon from "src/constants/getTxTypeIcon";
import getTxType from "src/constants/getTxType";
import {NavLink} from "react-router-dom";

const arrowSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_arrow.svg";
const symbolNone = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";
const bnbSVG = process.env.PUBLIC_URL + "/assets/icons/common/binance_token.svg";
const detailSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_detail_btn.svg";

const cx = cn.bind("styles");

const BINANCE_ASSSET_BASE = "https://explorer.binance.org/asset";

const getSide = Object.freeze([null, "Buy", "Sell"]);
const getTimeInforce = Object.freeze([null, "GTE", null, "IOC"]);
const getOrderType = Object.freeze([null, "ORDER", "LIMIT"]);

export default function({txData}) {
	const value = txData?.messages?.[0]?.value;
	const clickSymbol = React.useCallback(
		symbol => {
			if (_.isNil(symbol)) return;
			window.open(`${BINANCE_ASSSET_BASE}/${_.split(symbol, "_")[0]}`, "_blank");
		},
		[value]
	);
	return (
		<div className={cx("MsgList-wrapper")}>
			<h2 className={cx("title")}>Data</h2>
			<div className={cx("grid-wrapper")}>
				<InfoRow label='Asset'>
					<span>{_.split(value?.symbol, "-")[0]}</span>
				</InfoRow>
				<InfoRow label='Memo'>
					<span>{txData.memo === "" ? "-" : txData.memo}</span>
				</InfoRow>
				<InfoRow label='Transaction Type'>
					<span className={cx("txType-wrapper")}>
						<img className={cx("txType-img")} src={getTxTypeIcon(txData.txType)} alt={"icon"} />
						<span>{getTxType(txData.txType)}</span>
					</span>
				</InfoRow>
				<InfoRow label='From'>
					{empty(value.sender) ? (
						"-"
					) : (
						<NavLink className={cx("blueColor")} to={`/accounts/${txData.from}`}>
							{value.sender}
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
				<InfoRow label='Symbol'>
					<div className={cx("symbol-link")} onClick={() => clickSymbol(value?.symbol)}>
						<p>{value?.symbol}</p>
						<img src={detailSVG} alt='detail' />
					</div>
				</InfoRow>
				<TradeDisplay txData={txData} value={value} />
				<InfoRow label='Side'>
					<span className={cx({"color-red": value?.side === 2, "color-blue": value?.side === 1})}>{getSide[value?.side]}</span>
				</InfoRow>
				<InfoRow label='Price'>
					<span>
						{divide(divide(value?.quantity, consts.NUM.BASE_MULT), value?.price)} BNB / 1 {_.split(value?.symbol, "-")[0]}
					</span>
				</InfoRow>
				<InfoRow label='Order Type'>
					<span>{getOrderType[value?.ordertype]}</span>
				</InfoRow>
				<InfoRow label='Time Inforce'>
					<span>{getTimeInforce[value?.timeinforce]}</span>
				</InfoRow>
				<InfoRow label='Order ID'>
					<span>{value?.id}</span>
				</InfoRow>
			</div>
		</div>
	);
}

const TradeDisplay = ({txData, value}) => (
	<div className={cx("trade-wrapper")}>
		<TradeBox symbolSrc={txData.symbolSrc} symbol={value?.symbol} value={divide(value?.quantity, consts.NUM.BASE_MULT, 0)} />
		<div className={cx("symbol-wrapper")}>
			<img src={arrowSVG} alt='arrow' />
		</div>
		<TradeBox
			symbolSrc={bnbSVG}
			symbol={"BNB"}
			value={divide(multiply(value?.price, value?.quantity), multiply(consts.NUM.BASE_MULT, consts.NUM.BASE_MULT), 8)}
		/>
	</div>
);

const TradeBox = ({symbolSrc, symbol, value}) => {
	const formattedArr = React.useMemo(() => formatNumber(value).split("."), [value]);
	// console.log(formattedArr);
	return (
		<div className={cx("box-wrapper")}>
			<div className={cx("icon-wrapper")}>
				<img src={symbolSrc ? symbolSrc : symbolNone} alt={"ic"} />
				<div className={cx("icon")}>{_.split(symbol, "-")[0]}</div>
			</div>
			<div className={cx("value")}>
				{formattedArr[0]}
				{formattedArr[1] ? <span>.{formattedArr[1]}</span> : undefined}
			</div>
		</div>
	);
};
