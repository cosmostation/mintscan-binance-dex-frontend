import * as React from "react";
import styles from "./TxMessage.scss";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";
import {divide, multiply} from "src/lib/Big";
import {_, formatNumber, empty, refineAddress} from "src/lib/scripts";

//  redux
import {useSelector} from "react-redux";

//  hooks
import {useGetImage, useHistory} from "src/hooks";

//  constants
import getTxTypeIcon from "src/constants/getTxTypeIcon";
import consts from "src/constants/consts";
import txTypes from "src/constants/txTypes";
import getTxType from "src/constants/getTxType";

//  components
import {txCheckOrder, txCheckSend, txGetSide, txGetTimeInforce} from "src/components/Tx/TxData/TxCase";
import InfoRow from "src/components/common/InfoRow/InfoRow";
import TxGetFrom from "src/components/Tx/TxData/TxGetFrom/TxGetFrom";
import {useEffect} from "react";


const arrowSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_arrow.svg";
const symbolNone = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";
const detailSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_detail_btn.svg";
const bnbSVG = process.env.PUBLIC_URL + "/assets/icons/common/binance_token.svg";

// const bnbSVG = "https://static.binance.org/icon/8fedcd202fb549d28b2f313b2bf97033";

const cx = cn.bind(styles);

export default function({msg, txData}) {
	const history = useHistory();
	const {type, value} = msg;

	const clickSymbol = React.useCallback(symbol => {
		if (_.isNil(symbol)) return;
		window.open(`${consts.API_BIANCE_DEX}${symbol}`);
	}, [history]);

	const displaySymbol = () => {
		if(!value.symbol) return "";
		const split = value.symbol.split("_");
		return split[0].split("-")[0] + "_" + split[1].split("-")[0];
 	};
	// console.log(txData);
	return (
		<div className={cx("grid-wrapper")}>
			<div className={cx("type-wrapper")}>
				<img className={cx("txType-img")} src={getTxTypeIcon(type)} alt={"icon"} />
				<span>{getTxType(type)}</span>
			</div>
			<div className={cx("grid")}>
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
											{refineAddress(value.outputs[0].address)}
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
				{txCheckOrder(type) ? (
					<>
						{txTypes.DEX.ORDER_NEW === type ?
							<InfoRow label='Side'>
								<span className={cx({"color-red": value?.side === 2, "color-blue": value?.side === 1})}>{txGetSide[value?.side]} </span>
								{value?.symbol.split("-")[0]}
							</InfoRow>
							: undefined
						}
						<InfoRow label='Symbol'>
							<div className={cx("symbol-link")} onClick={() => clickSymbol(value?.symbol)}>
								<p>{displaySymbol()}</p>
								<img src={detailSVG} alt='detail' />
							</div>
						</InfoRow>
						{txTypes.DEX.ORDER_NEW === type ? (
							<>
								<TradeDisplay value={value} />
								<InfoRow label='Price'>
									{/*{(() => console.log(value))()}*/}
									<span>
										{divide(value?.price, consts.NUM.BASE_MULT, 8)} BNB / 1 {_.split(value?.symbol, "-")[0]}
									</span>
								</InfoRow>
								{/*Removed because only one type is possible ATM*/}
								{/*<InfoRow label='Order Type'>*/}
								{/*	<span>{txGetOrderType[value?.ordertype]}</span>*/}
								{/*</InfoRow>*/}
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
				<InfoRow label='From'>
					<TxGetFrom txData={txData} type={type} value={value} cx={cx} />
				</InfoRow>
				<InfoRow label='Memo'>
					<span>{txData.memo === "" ? "-" : txData.memo}</span>
				</InfoRow>
			</div>
		</div>
	);
}

const TradeDisplay = ({value}) => {
	let [left, right] = [{}, {}];
	[left.symbol, right.symbol] = _.split(value.symbol, "_");
	[left.value, right.value] = [divide(value?.quantity, consts.NUM.BASE_MULT, 8), divide(multiply(value?.price, value?.quantity), multiply(consts.NUM.BASE_MULT, consts.NUM.BASE_MULT), 8)]
	// TODO
	//  set symbol source when backend provides
	if(value.side === 1) [left, right] = [right, left];
	return (
		<div className={cx("trade-wrapper")}>
			<TradeBox symbol={left.symbol} value={left.value} />
			<div className={cx("symbol-wrapper")}>
				<img src={arrowSVG} alt='arrow' />
			</div>
			<TradeBox
				symbol={right.symbol}
				value={right.value}
			/>
		</div>
	);
};

const TradeBox = ({symbol, value}) => {
	const images = useSelector(state => state.assets.images);
	const formattedArr = React.useMemo(() => formatNumber(value).split("."), [value]);
	const [image, setLinkArr] = useGetImage([], symbolNone);

	useEffect(() => {
		if(!empty(images) && !_.isNil(symbol) && image === symbolNone) {
			if(symbol === "BNB") setLinkArr([bnbSVG]);
			else setLinkArr([consts.GET_LOGO_LINK(symbol), images[symbol]]);
		}
	}, [images, setLinkArr, symbol, value]);

	return (
		<div className={cx("box-wrapper")}>
			<div className={cx("icon-wrapper")}>
				<div className={cx("img-wrapper")}>
					<img src={image} alt={"ic"} />
				</div>
				<div className={cx("icon")}>{symbol.split("-")[0]}</div>
			</div>
			<div className={cx("value")}>
				{formattedArr[0]}
				{formattedArr[1] ? <span>.{formattedArr[1]}</span> : undefined}
			</div>
		</div>
	);
};
