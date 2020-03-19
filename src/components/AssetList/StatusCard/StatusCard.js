import React from "react";
import styles from "./StatusCard.scss";
import classNames from "classnames/bind";
import {_, empty, formatNumber, getUnixTimes} from "src/lib/scripts";
import {useHistory} from "src/hooks";
import {getGeckoMarketChartRange, getMarketChartRange} from "src/lib/api";
import axios from "axios";
import ErrorPage from "src/components/common/ErrorPage/ErrorPage";
import Chart from "src/components/common/Chart/Chart";

const cx = classNames.bind(styles);

const symbolNoneSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";
const upSVG = process.env.PUBLIC_URL + "/assets/assets/up_gr.svg";
const downSVG = process.env.PUBLIC_URL + "/assets/assets/down_rd.svg";

const DAY_IN_MINUTES = 24 * 60;
const DATA_COUNT_DENOM = 16;

export default function({asset}) {
	const [data, setData] = React.useState(null);
	const history = useHistory();

	React.useEffect(() => {
		const times = getUnixTimes(DAY_IN_MINUTES, "minute", "hour");
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		getGeckoMarketChartRange("binancecoin", "usd", times[0], times[1], source.token)
			.then(res => {
				const mapped = _.map(_.initial(_.keys(res.data)), key => _.map(res.data[key], v => [v[0], Math.round(v[1] * 100) / 100]));
				setData(_.map(mapped, arr => _.filter(arr, (v, idx) => idx % DATA_COUNT_DENOM === 0 || idx === 0 || idx === mapped.length - 1)));
			})
			.catch(ex => {
				console.log("exception querying coinGecko", ex);
			});
		return () => {
			source.cancel("cleanup cancel");
		}
	}, []);


	const splitPrice = asset?.price ? formatNumber(asset.price).split(".") : ["0", "00000"];
	return (
		<div className={cx("statuscard-wrapper")} onClick={() => history.push(`/assets/${asset?.asset}`)}>
			<div className={cx("wrapper")}>
				<div className={cx("asset-graph-wrapper")}>
					<div className={cx("asset")}>
						<img src={asset?.assetImg ? asset?.assetImg : symbolNoneSVG} alt={"none"} />
						<div className={cx("name")}>{asset?.name ? asset.name : "-"}</div>
					</div>
					<div className={cx("graph-wrapper")}>
						{_.isNil(data) ? (
							undefined
						) : empty(data?.[0]) || empty(data?.[0]) ? (
							<ErrorPage />
						) : (
							<Chart key={0} options={options} data={data[0]} showAxis={false} displayMax={true}/>
						)}
					</div>
				</div>
				<div className={cx("price-percentage-wrapper")}>
					<div className={cx("price")}>
						<span>$ {splitPrice[0]}.</span>
						{splitPrice[1]}
					</div>
					<div className={cx("percentage")}>
						<img src={upSVG} alt='direc' />
						9.17%
					</div>
				</div>
				{/*<div className={cx("market-cap")}>$ {formatNumber(asset?.marketCap)}</div>*/}
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
		showAxes: false
	},
	tooltip: {
		enabled: false
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
