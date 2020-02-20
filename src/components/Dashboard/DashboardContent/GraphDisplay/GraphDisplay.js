import * as React from "react";
import cn from "classnames/bind";

import {getUnixTimes, get24Hours, _} from "src/lib/scripts";
import {getMarketChartRange} from "src/lib/api";

import Chart from "src/components/common/Chart";
import styles from "./GraphDisplay.scss";

const cx = cn.bind(styles);

export default function(props) {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		const times = getUnixTimes(8);
		getMarketChartRange("binancecoin", "usd", times[0], times[1])
			.then(res => {
				setData(_.map(_.keys(res.data), key => _.map(res.data[key], v => [v[0], Math.round(v[1] * 100) / 100])));
			})
			.catch(ex => {
				console.log("exception querying coinGecko", ex);
			});
	}, []);

	const options = {
		chart: {
			type: "areaspline",
			margin: [20, 80, 20, 0],
			height: 250,
			width: 450,
			spacing: [0, 0, 0, 0],
			renderTo: "container",
		},
	};
	console.log("length: ", data?.[0]?.length);
	return <div className={cx("GraphDisplay")}>{!_.isNil(data) ? <Chart options={options} data={data?.[0]} /> : undefined}</div>;
}
