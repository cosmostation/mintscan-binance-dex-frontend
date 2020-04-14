import * as React from "react";
import cn from "classnames/bind";
import styles from "./PriceDisplay.scss";
import {formatNumber} from "src/lib/scripts";
//  component
import Skeleton from "react-skeleton-loader";
//  redux
import {useSelector} from "react-redux";
import consts from "src/constants/consts";
//  svgs
import down_rd from "src/assets/common/arrow_down.svg";
import up_gr from "src/assets/common/arrow_up.svg";
import blocktimeSVG from "src/assets/dashboard/blocktime_ic.svg";

const cx = cn.bind(styles);

export default function(props) {
	const status = useSelector(state => state.blockchain.status);

	// React.useEffect(() => {
	// 	const cancelToken = axios.CancelToken;
	// 	const source = cancelToken.source();
	// 	dispatch(getCryptoBasicData("binancecoin", "usd", source.token));
	// 	dispatch(getCryptoStatus(source.token));
	// 	return () => {
	// 		source.cancel("cleanup cancel");
	// 	};
	// }, [dispatch]);
	return React.useMemo(
		() => (
			<div className={cx("PriceDisplay")}>
				<div className={cx("iconBlockTime-wrapper")}>
					<div className={cx("icon")}>
						<img alt='BNB_icon' />
						<div className={cx("text")}>BNB</div>
					</div>
					<div className={cx("BlockTime")}>
						<img src={blocktimeSVG} alt={"BT"} />
						<p>
							Block time <span>{status?.blockTime}ms</span>
						</p>
					</div>
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
