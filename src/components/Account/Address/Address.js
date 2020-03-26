import React from "react";
import cn from "classnames/bind";
import styles from "./Address.scss";
import {_, empty, formatNumber} from "src/lib/scripts";
//  components
import {divide, fixed, multiply, sumArray} from "src/lib/Big";
import {useSelector} from "react-redux";

//  assets
const qrSVG = process.env.PUBLIC_URL + "/assets/account/qr_code.svg";

const cx = cn.bind(styles);
const ADDRESS_LENGTH = 42;
const ADDRESS_CUT_DISPLAY_LENGTH = 6;
export default function Address({account = {}, prices = []}) {
	const bnbPrice = useSelector(state => state.blockchain.status?.price);

	const total = React.useMemo(() => {
		if (empty(prices)) return;
		const {balances} = account;
		//  dollars
		const totalAssets = _.map(balances, (v, i) => multiply(getTotalSum(v), prices[i]));
		const freeAssets = _.map(balances, (v, i) => multiply(getFreeSum(v), prices[i]));
		return [sumArray(totalAssets), sumArray(freeAssets)];
	}, [account, prices]);

	return React.useMemo(
		() => (
			<div className={cx("Address-wrapper")}>
				<div className={cx("qr-address-wrapper")}>
					<div className={cx("qr-wrapper")}>
						<img src={qrSVG} alt={"qr-code"} />
					</div>
					<ul className={cx("AddressDisplay-wrapper")}>
						<li className={cx("label")}>Address</li>
						<li className={cx("value")}>
							<p>
								{account.address ? (
									<>
										<span className={cx("front")}>{account.address.substr(0, ADDRESS_CUT_DISPLAY_LENGTH)}</span>
										<span className={cx("remove")}>{account.address.substr(ADDRESS_CUT_DISPLAY_LENGTH, ADDRESS_LENGTH - ADDRESS_CUT_DISPLAY_LENGTH * 2)}</span>
										{account.address.substr(ADDRESS_LENGTH - ADDRESS_CUT_DISPLAY_LENGTH, ADDRESS_CUT_DISPLAY_LENGTH)}
									</>
								) : (
									"-"
								)}
							</p>
							<img alt={"copy"} />
						</li>
					</ul>
				</div>
				<div className={cx("statistics-wrapper")}>
					<ul className={cx("total-wrapper")}>
						<li className={cx("value")}>
							<span className={cx("front")}>Est</span>
							<span className={cx("remove")}>imated</span> Value
						</li>
						<li className={cx("dollars")}>
							<span className={cx("currency")}>$</span>
							{!_.isNil(total?.[0]) && !_.isNil(bnbPrice) ? <span>{formatNumber(fixed(total?.[0] ? total?.[0] : 0, 0))}</span> : <span>-</span>}
						</li>
					</ul>
					<ul className={cx("compare-wrapper")}>
						<li style={{color: "#cfcfcf"}}>
							$<span>{fixed(!_.isNil(bnbPrice) ? bnbPrice : 0, 2)}</span> / BNB
						</li>
						<li className={cx("compareBNB")}>
							{!_.isNil(total?.[0]) ? (
								<>
									<span>{formatNumber(divide(total?.[0], bnbPrice, 0))}</span>
									<span className={cx("BNB")}>BNB</span>
								</>
							) : (
								<span>-</span>
							)}
						</li>
					</ul>
				</div>
			</div>
		),
		[account.address, bnbPrice, total]
	);
}

const getTotalSum = asset => {
	return sumArray([asset.free, asset.locked, asset.frozen]);
};

const getFreeSum = asset => {
	return asset.free;
};
