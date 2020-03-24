import React from "react";
import cn from "classnames/bind";
import styles from "./Address.scss";
import {_, empty} from "src/lib/scripts";

//  components
import Decimal from "src/components/common/Decimal";
import {multiply, sumArray} from "src/lib/Big";
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
		const totalAssets = _.map(balances, (v, i) => multiply(getTotalSum(v), prices[i]));
		const freeAssets = _.map(balances, (v, i) => multiply(getFreeSum(v), prices[i]));
		return [sumArray(totalAssets), sumArray(freeAssets)];
	}, [account, prices]);

	return (
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
				<ul className={cx("price-wrapper")}>
					<li>Binance Token</li>
					<li>
						1<span className={cx("BNB")}>BNB</span>
					</li>
					<li>${!_.isNil(bnbPrice) ? <Decimal fontSizeBase={14} value={`${bnbPrice}`} bottom={2} /> : "-"}</li>
				</ul>
				<ul className={cx("total-wrapper")}>
					<li>Total</li>
					{!_.isNil(total?.[0]) ? <Decimal fontSizeBase={18} value={total?.[0]} /> : <span>-</span>}
					{!_.isNil(total?.[0]) && !_.isNil(bnbPrice) ? <Decimal fontSizeBase={14} value={multiply(total?.[0], bnbPrice, 2)} bottom={2} /> : <span>-</span>}
				</ul>
				<ul className={cx("available-wrapper")}>
					<li>Available</li>
					{!_.isNil(total?.[1]) ? <Decimal fontSizeBase={18} value={total?.[1]} /> : <span>-</span>}
					{!_.isNil(total?.[1]) && !_.isNil(bnbPrice) ? <Decimal fontSizeBase={14} value={multiply(total?.[1], bnbPrice, 2)} bottom={2} /> : <span>-</span>}
				</ul>
			</div>
		</div>
	);
}

const getTotalSum = asset => {
	return sumArray([asset.free, asset.locked, asset.frozen]);
};

const getFreeSum = asset => {
	return asset.free;
};
