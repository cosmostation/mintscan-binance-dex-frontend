import * as React from "react";
import cn from "classnames/bind";

import {getUnixTimes, get24Hours, _} from "src/lib/scripts";
import {getMarketChartRange} from "src/lib/api";

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
		getMarketChartRange("binancecoin", "usd", times[0], times[1])
			.then(res => {
				const mapped = _.map(_.initial(_.keys(res.data)), key => _.map(res.data[key], v => [v[0], Math.round(v[1] * 100) / 100]));
				console.log(mapped);
				setData(_.map(mapped, arr => _.filter(arr, (v, idx) => idx % DATA_COUNT_DENOM === 0 || idx === 0 || idx === mapped.length - 1)));
			})
			.catch(ex => {
				console.log("exception querying coinGecko", ex);
			});
	}, []);
	const clickTab = React.useMemo(() => () => setShowPrice(v => !v), []);
	console.log(data?.[0].length);
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
				{!_.isNil(data) ? <Chart key={showPrice} options={options(showPrice ? 0 : 1)} data={data?.[showPrice ? 0 : 1]} /> : undefined}
			</div>
		</div>
	);
}

const options = val => ({
	chart: {
		type: "areaspline",
		margin: margin[val],
		height: "180px",
		width: null,
		spacing: [20, 20, 20, 20],
		renderTo: "container",
	},
});
const margin = [
	[5, 60, 20, 10],
	[5, 60, 20, 10],
];
