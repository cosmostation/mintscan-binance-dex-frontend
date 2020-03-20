import React from "react";
import styles from "./StatusCard.scss";
import classNames from "classnames/bind";
import {_, empty, formatNumber, getUnixTimes} from "src/lib/scripts";
import {divide} from "src/lib/Big";
import {getGeckoMarketChartRange} from "src/lib/api";
import axios from "axios";
import {useHistory} from "src/hooks";

//  components
import Chart from "src/components/common/Chart/Chart";
import consts from "src/constants/consts";
import Decimal from "src/components/common/Decimal/Decimal";

const cx = classNames.bind(styles);

const symbolNoneSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";
const upSVG = process.env.PUBLIC_URL + "/assets/assets/up_gr.svg";
const downSVG = process.env.PUBLIC_URL + "/assets/assets/down_rd.svg";

const DAY_IN_MINUTES = 24 * 60;
const DATA_COUNT_DENOM = 16;

export default function({asset, id}) {
	const [data, setData] = React.useState(null);
	const history = useHistory();
	React.useEffect(() => {
		if (_.isNil(id) || !_.isNil(data)) return;
		const times = getUnixTimes(DAY_IN_MINUTES, "minute", "hour");
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		getGeckoMarketChartRange(id, "usd", times[0], times[1], source.token)
			.then(res => {
				const mapped = _.map(_.initial(_.keys(res.data)), key => _.map(res.data[key], v => [v[0], Math.round(v[1] * 100) / 100]));
				setData(_.map(mapped, arr => _.filter(arr, (v, idx) => idx % DATA_COUNT_DENOM === 0 || idx === 0 || idx === mapped.length - 1)));
			})
			.catch(ex => {
				console.log("exception querying coinGecko", ex);
			});
		return () => {
			source.cancel("cleanup cancel");
		};
	}, [data, id]);

	const splitPrice = asset?.price ? formatNumber(asset.price).split(".") : ["-"];
	const splitMarketCap = asset?.marketCap ? formatNumber(asset.marketCap).split(".") : ["-"];
	const diffPercent = asset?.changeRange ? divide(asset.changeRange, 100, 2) : undefined;
	return (
		<div className={cx("statuscard-wrapper")} onClick={() => history.push(`/assets/${asset?.asset}`)}>
			<div className={cx("wrapper")}>
				<div className={cx("asset-graph-wrapper")}>
					<div className={cx("asset")}>
						<img src={asset?.assetImg ? asset?.assetImg : symbolNoneSVG} alt={"none"} />
						<div className={cx("name")}>{asset?.mappedAsset ? asset.mappedAsset : "-"}</div>
					</div>
					<div className={cx("graph-wrapper")}>
						{_.isNil(data) ? (
							undefined
						) : empty(data?.[0]) || empty(data?.[0]) ? (
							<div>Error loading Chart</div>
						) : (
							<Chart key={0} options={options} data={data[0]} showAxis={false} displayMax={true} />
						)}
					</div>
				</div>
				<div className={cx("price-percentage-wrapper")}>
					<div className={cx("price")}>
						{splitPrice[0] === "-" ? (
							"$ -"
						) : (
							<>
								<span>$ {splitPrice[0]}.</span>
								{splitPrice[1]}
							</>
						)}
					</div>
					<div className={cx("percentage")}>
						{diffPercent ? (
							<>
								<img src={asset?.changeRange > 0 ? upSVG : downSVG} alt='direc' />
								<>
									{diffPercent.split(".")[0]}.<span>{diffPercent.split(".")[1]}%</span>
								</>
							</>
						) : (
							undefined
						)}
					</div>
				</div>
				<div className={cx("market-cap")}>
					{splitMarketCap[0] === "-" ? (
						"$ -"
					) : (
						<>
							$ {splitMarketCap[0]}
							{splitMarketCap[1] ? <span className={cx("decimal")}>.{splitMarketCap[1]}</span> : undefined}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

const options = {
	chart: {
		type: "areaspline",
		margin: [5, 5, 5, 5],
		height: "50px",
		spacing: [5, 5, 5, 5],
		renderTo: "container",
		showAxes: false,
	},
	tooltip: {
		enabled: false,
	},
	plotOptions: {
		series: {
			states: {
				hover: {
					enabled: false,
					lineWidthPlus: 0,
					halo: {
						size: 0,
						opacity: 0,
					},
				},
				select: {
					enabled: false,
				},
			},
			allowPointSelect: false,
			marker: {
				enabled: false,
			},
		},
	},
};
