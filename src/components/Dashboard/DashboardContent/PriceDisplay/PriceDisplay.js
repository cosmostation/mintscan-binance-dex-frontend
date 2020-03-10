import * as React from "react";
import cn from "classnames/bind";
import styles from "./PriceDisplay.scss";
import {formatNumber} from "src/lib/scripts";
import axios from "axios";
//  component
import Skeleton from "react-skeleton-loader";
//  redux
import {useDispatch, useSelector} from "react-redux";
import {getCryptoBasicData} from "src/store/modules/blockchain";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

//  svgs
const down_rd = process.env.PUBLIC_URL + "/assets/dashboard/down_rd.svg";
const up_gr = process.env.PUBLIC_URL + "/assets/dashboard/up_gr.svg";

export default function(props) {
	const status = useSelector(state => state.blockchain.status);
	const dispatch = useDispatch();

	React.useEffect(() => {
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		dispatch(getCryptoBasicData("binancecoin", "usd", source.token));
		return () => {
			source.cancel("cleanup cancel");
		};
	}, []);
	return React.useMemo(
		() => (
			<div className={cx("PriceDisplay")}>
				<div className={cx("icon")}>
					<img alt='BNB_icon' />
					<div className={cx("text")}>BNB</div>
				</div>
				<div className={cx("price")}>{status?.price ? `$${status?.price}` : <Skeleton width={"92px"} height={"34px"} />}</div>
				<div className={cx("volume24h-wrapper")}>
					<button onClick={e => window.open(consts.LINK.COINGECKO_BINANCE, "_blank")}>
						{/*<div className={cx("text")}>coingecko</div>*/}
						coingecko
					</button>
					<div className={cx("content")}>
						{status.change_24h ? (
							<>
								<img src={status.change_24h >= 0 ? up_gr : down_rd} alt='none' />
								{status.change_24h >= 0 ? "+" : ""}
								{status.change_24h}% (24h)
							</>
						) : (
							<Skeleton width={"122px"} height={"19px"} />
						)}
					</div>
				</div>
				<div className={cx("CapVolume-wrapper")}>
					<ul>
						<li>Market Cap</li>
						<li>{status.market_cap ? `$${formatNumber(status.market_cap)}` : <Skeleton width={"134px"} />}</li>
					</ul>
					<ul>
						<li>24h Vol</li>
						<li>{status.vol_24h ? `$${formatNumber(status.vol_24h)}` : <Skeleton width={"134px"} />}</li>
					</ul>
				</div>
			</div>
		),
		[status]
	);
}
