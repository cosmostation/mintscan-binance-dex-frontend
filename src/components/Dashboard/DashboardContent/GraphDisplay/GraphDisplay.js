import * as React from "react";
import cn from "classnames/bind";
import axios from "axios";

import {_, empty, getUnixTimes} from "src/lib/scripts";
import {getMarketChartRange} from "src/lib/api";

import ErrorPage from "src/components/common/ErrorPage";
import Chart from "src/components/common/Chart";
import styles from "./GraphDisplay.scss";

const cx = cn.bind(styles);

//  coingecko api
/*
	0: prices
	1: market_caps
	2: total_volumes
*/

const TWO_HOURS_IN_MINUTES = 24 * 60;
const DATA_COUNT_DENOM = 4;

export default function(props) {
	const [data, setData] = React.useState(null);
	const [showPrice, setShowPrice] = React.useState(true);

	React.useEffect(() => {
		const times = getUnixTimes(TWO_HOURS_IN_MINUTES, "minute", "hour");
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		getMarketChartRange("binancecoin", "usd", times[0], times[1], source.token)
			.then(res => {
				if (_.isObject(res.data)) {
					const mapped = _.map(_.initial(_.keys(res.data)), key => _.map(res.data[key], v => [v[0], Math.round(v[1] * 100) / 100]));
					setData(_.map(mapped, arr => _.filter(arr, (v, idx) => idx % DATA_COUNT_DENOM === 0 || idx === 0 || idx === mapped.length - 1)));
				}
			})
			.catch(ex => {
				console.log("exception querying coinGecko", ex);
			});
		return () => {
			source.cancel("cleanup cancel");
		};
	}, []);
	const clickTab = React.useMemo(() => () => setShowPrice(v => !v), []);
	return (
		<div className={cx("GraphDisplay")}>
			<div className={cx("tab-wrapper")}>
				<button className={cx({selected: showPrice})} onClick={clickTab}>
					<p>Price</p>
				</button>
				<button className={cx({selected: !showPrice})} onClick={clickTab}>
					<p>Volume</p>
				</button>
			</div>
			<div className={cx("Graph-wrapper")}>
				{_.isNil(data) ? (
					undefined
				) : empty(data?.[0]) || empty(data?.[0]) ? (
					<ErrorPage />
				) : (
					<Chart key={showPrice} options={options} data={data?.[showPrice ? 0 : 1]} />
				)}
			</div>
		</div>
	);
}

const options = {
	chart: {
		type: "areaspline",
		margin: [5, 15, 20, 15],
		height: "180px",
		width: null,
		spacing: [20, 20, 20, 20],
		renderTo: "container",
	},
};
