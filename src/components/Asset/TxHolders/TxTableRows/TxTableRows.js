import React from "react";
import styles from "./TxTableRows.scss";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";

import {_, formatNumber, reduceString, refineAddress, setAgoTime} from "src/lib/scripts";
import {fixed} from "src/lib/Big";
import getTxType from "src/constants/getTxType";
//  components
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import SvgDisplay from "src/components/common/SvgDisplay";
//  assets
import greenArrowSVG from "src/assets/common/transferarrow_gr.svg";

const cx = cn.bind(styles);

export const ThinTableRow = ({asset = {}}) => {
	const formattedValue = !_.isNil(asset.value) ? formatNumber(fixed(asset.value)).split(".") : undefined;
	return (
		<div key={asset.id} className={cx("AssetTxList-thinTableRow")}>
			<div className={cx("divider")} />
			<ul className={cx("row")}>
				<li>Tx Hash</li>
				{asset.txHash ? (
					<li>
						<NavLink className={cx("blueColor")} to={`/txs/${asset.txHash}`}>
							{reduceString(asset.txHash, 6, 6)}
						</NavLink>
					</li>
				) : (
					<Skeleton />
				)}
			</ul>
			<ul className={cx("row")}>
				<li>Type</li>
				<li className={cx("text")}>
					{asset.txType ? <span className={cx("type")}>{getTxType(asset.txType, cx)}</span> : <Skeleton width={"80px"} widthRandomness={0} />}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li className={cx("Address")}>Address</li>
				<li className={cx("flexIt", {transfer: !_.isNil(asset.toAddr)})}>
					{asset.fromAddr ? (
						<>
							<NavLink className={cx("blueColor")} to={`/account/${refineAddress(asset.fromAddr)}`}>
								{reduceString(refineAddress(asset.fromAddr), 6, 6)}
							</NavLink>
							{asset.txType !== "TRANSFER" ? (
								undefined
							) : (
								<>
									<SvgDisplay svgSrc={greenArrowSVG} customClass={"upsideDown"} />
									{asset.toAddr ? (
										<NavLink className={cx("blueColor")} to={`/account/${refineAddress(asset.toAddr)}`}>
											{reduceString(refineAddress(asset.toAddr), 6, 6)}
										</NavLink>
									) : (
										undefined
									)}
								</>
							)}
						</>
					) : (
						<Skeleton width={"200px"} widthRandomness={0} />
					)}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>Value</li>
				<li>
					{!_.isNil(formattedValue) ? (
						<span className={cx("flexIt")}>
							<div className={cx("number-wrapper")}>
								{formattedValue[0]}
								{formattedValue[1] ? (
									<>
										.<span>{formattedValue[1]}</span>
									</>
								) : (
									undefined
								)}
							</div>
							{!_.isNil(asset?.txAsset) ? (
								<span className={cx({BNB: asset?.txAsset?.split("-")[0] === "BNB"})}>{asset?.txAsset?.split("-")[0]}</span>
							) : (
								undefined
							)}
						</span>
					) : (
						<Skeleton />
					)}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>Time</li>
				<li>{asset.timeStamp ? setAgoTime(asset.timeStamp) : <Skeleton width={"50px"} widthRandomness={0} />}</li>
			</ul>
		</div>
	);
};

export default function TxTableRows({asset = {}}) {
	const formattedValue = !_.isNil(asset.value) ? formatNumber(fixed(asset.value)).split(".") : undefined;
	return (
		<TableRow className={cx("TxTableRows-wrapper")} hover={true} key={asset.txHash}>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row'>
				{asset.txHash ? (
					<NavLink className={cx("blueColor")} to={`/txs/${asset.txHash}`}>
						{reduceString(asset.txHash, 6, 6)}
					</NavLink>
				) : (
					<Skeleton width={"80px"} widthRandomness={0} />
				)}
			</TableCell>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row'>
				{asset.txType ? <span className={cx("type")}>{getTxType(asset.txType, cx)}</span> : <Skeleton width={"80px"} widthRandomness={0} />}
			</TableCell>
			<TableCell className={cx("tableCell", "text", "address")} component='th' scope='row'>
				<span className={cx("flexIt")}>
					{asset.fromAddr ? (
						<>
							<NavLink className={cx("blueColor")} to={`/account/${refineAddress(asset.fromAddr)}`}>
								{reduceString(refineAddress(asset.fromAddr), 6, 6)}
							</NavLink>
							{asset.txType !== "TRANSFER" ? (
								undefined
							) : (
								<>
									<SvgDisplay svgSrc={greenArrowSVG} customClass={"upsideDown"} />
									{asset.toAddr ? (
										<NavLink className={cx("blueColor")} to={`/account/${refineAddress(asset.toAddr)}`}>
											{reduceString(refineAddress(asset.toAddr), 6, 6)}
										</NavLink>
									) : (
										undefined
									)}
								</>
							)}
						</>
					) : (
						<Skeleton width={"200px"} widthRandomness={0} />
					)}
				</span>
			</TableCell>
			<TableCell className={cx("tableCell", "text", "value")} component='th' scope='row'>
				{formattedValue ? (
					<div className={cx("number-wrapper")}>
						{formattedValue[0]}
						{formattedValue[1] ? (
							<>
								.<span>{formattedValue[1]}</span>
							</>
						) : (
							undefined
						)}
					</div>
				) : (
					<Skeleton width={"100px"} widthRandomness={0} />
				)}
			</TableCell>
			<TableCell className={cx("tableCell", "text", asset.txAsset === "BNB" ? "BNB" : undefined)} component='th' scope='row'>
				{asset.txAsset ? asset.txAsset : <Skeleton width={"80px"} widthRandomness={0} />}
			</TableCell>
			<TableCell className={cx("tableCell", "text", "time")} component='th' scope='row'>
				{asset.timeStamp ? setAgoTime(asset.timeStamp) : <Skeleton width={"50px"} widthRandomness={0} />}
			</TableCell>
		</TableRow>
	);
}

// const transfer = {
// 	txHash: "ADF7F741EA16D27C3141358F9A2978B0FEA3E53ECCA4D28E29AE1C12B6FFD703",
// 	blockHeight: 75345656,
// 	txType: "TRANSFER",
// 	timeStamp: 1584543742924,
// 	fromAddr: "bnb1jxfh2g85q3v0tdq56fnevx6xcxtcnhtsmcu64m",
// 	toAddr: "bnb1ma0zg27u6dtefhgqfxyknu22sltg2whmaec3w8",
// 	value: 4.57195068,
// 	txAsset: "BNB",
// 	txFee: 0.000375,
// 	txAge: 25,
// 	code: 0,
// 	log: "Msg 0: ",
// 	confirmBlocks: 0,
// 	memo: "",
// 	source: 0,
// 	hasChildren: 0,
// };
//
// const order = {
// 	blockHeight: 75324609,
// 	code: 0,
// 	txHash: "077DC78ECE7E7D7C5E64420A686C5493FB7C1A7A84EB39435EF54C080447F78A",
// 	txType: "NEW_ORDER",
// 	txAsset: "UND-EBC",
// 	txQuoteAsset: "USDSB-1AC",
// 	value: 41.6358828,
// 	txFee: 0,
// 	fromAddr: "bnb19nkqddexsrrn74sge58shaezmgft7tc78xsea8",
// 	message: {
// 		orderData: {
// 			symbol: "UND-EBC_USDSB-1AC",
// 			orderType: "LIMIT",
// 			side: "SELL",
// 			price: "0.0324267",
// 			quantity: "1284",
// 			timeInForce: "GTE",
// 			orderId: "2CEC06B72680C73F5608CD0F0BF722DA12BF2F1E-962769",
// 		},
// 	},
// 	log: "Msg 0: ",
// 	confirmBlocks: 0,
// 	memo: "",
// 	source: 0,
// 	timeStamp: 1584535424190,
// };
