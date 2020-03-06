import * as React from "react";
import styles from "./TxMessage.scss";
import cn from "classnames/bind";

import {NavLink} from "react-router-dom";
import {divide, multiply} from "src/lib/Big";
import {_, formatNumber} from "src/lib/scripts";

import getTxTypeIcon from "src/constants/getTxTypeIcon";
import consts from "src/constants/consts";
import txTypes from "src/constants/txTypes";
import getTxType from "src/constants/getTxType";

import {txCheckOrder, txCheckSend, txGetOrderType, txGetSide, txGetTimeInforce} from "src/components/Tx/TxData/TxCase";
import InfoRow from "src/components/common/InfoRow/InfoRow";
import TxGetFrom from "src/components/Tx/TxData/TxGetFrom/TxGetFrom";

const arrowSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_arrow.svg";
const symbolNone = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";
const bnbSVG = process.env.PUBLIC_URL + "/assets/icons/common/binance_token.svg";
const detailSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_detail_btn.svg";

const BINANCE_ASSSET_BASE = "https://explorer.binance.org/asset";

const cx = cn.bind(styles);

export default function({msg, txData}) {
	console.log(msg);
	const {type, value} = msg;

	const clickSymbol = React.useCallback(
		symbol => {
			if (_.isNil(symbol)) return;
			window.open(`${BINANCE_ASSSET_BASE}/${_.split(symbol, "_")[0]}`, "_blank");
		},
		[value]
	);

	return (
		<div className={cx("grid-wrapper")}>
			<div className={cx("type-wrapper")}>
				<img className={cx("txType-img")} src={getTxTypeIcon(type)} alt={"icon"} />
				<span>{getTxType(type)}</span>
			</div>
			<div className={cx("grid")}>
				{txCheckOrder(type) || txCheckSend(type) ? (
					<InfoRow label='Asset'>
						<span>{txCheckOrder(type) ? _.split(value?.symbol, "-")[0] : _.split(msg?.value?.inputs?.[0]?.coins?.[0]?.denom, "-")[0]}</span>
					</InfoRow>
				) : (
					undefined
				)}
				<InfoRow label='Memo'>
					<span>{txData.memo === "" ? "-" : txData.memo}</span>
				</InfoRow>
				<InfoRow label='From'>
					<TxGetFrom txData={txData} type={type} value={value} cx={cx} />
				</InfoRow>
				{txCheckSend(type) ? (
					<>
						<div className={cx("toValue-row")}>
							<div className={cx("row-label")}>To / Value</div>
							<div className={cx("row-content")}>
								<ul className={cx("label-wrapper")}>
									<li>To</li>
									<li>Value</li>
								</ul>
								<ul className={cx("value-wrapper")}>
									<li>
										<NavLink className={cx("blueColor")} to={`/accounts/${txData.to}`}>
											{value.outputs[0].address}
										</NavLink>
									</li>
									<li>
										<span>
											{/*<span>{formatNumber(split[0])}</span>.<span className={cx("decimal")}>{split[1]}</span>*/}
											{divide(msg?.value?.inputs?.[0]?.coins?.[0]?.amount, consts.NUM.BASE_MULT)} {msg?.value?.inputs?.[0]?.coins?.[0]?.denom}
										</span>
									</li>
								</ul>
							</div>
						</div>
					</>
				) : (
					undefined
				)}
				{/*orders*/}
				{txCheckOrder(type) ? (
					<>
						<InfoRow label='Symbol'>
							<div className={cx("symbol-link")} onClick={() => clickSymbol(value?.symbol)}>
								<p>{value?.symbol}</p>
								<img src={detailSVG} alt='detail' />
							</div>
						</InfoRow>
						{txTypes.DEX.ORDER_NEW === type ? (
							<>
								<TradeDisplay txData={txData} value={value} />
								<InfoRow label='Side'>
									<span className={cx({"color-red": value?.side === 2, "color-blue": value?.side === 1})}>{txGetSide[value?.side]}</span>
								</InfoRow>
								<InfoRow label='Price'>
									<span>
										{divide(divide(value?.quantity, consts.NUM.BASE_MULT), value?.price)} BNB / 1 {_.split(value?.symbol, "-")[0]}
									</span>
								</InfoRow>
								<InfoRow label='Order Type'>
									<span>{txGetOrderType[value?.ordertype]}</span>
								</InfoRow>
								<InfoRow label='Time Inforce'>
									<span>{txGetTimeInforce[value?.timeinforce]}</span>
								</InfoRow>
								<InfoRow label='Order ID'>
									<span>{value?.id}</span>
								</InfoRow>
							</>
						) : (
							undefined
						)}
					</>
				) : (
					undefined
				)}
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
