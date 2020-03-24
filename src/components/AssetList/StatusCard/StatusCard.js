import React from "react";
import styles from "./StatusCard.scss";
import classNames from "classnames/bind";
import moment from "moment";
import {_, empty, formatNumber, getUnixTimes} from "src/lib/scripts";
import {divide} from "src/lib/Big";
import {useHistory} from "src/hooks";
//  components
import Chart from "src/components/common/Chart/Chart";

const cx = classNames.bind(styles);

const symbolNoneSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";
const upSVG = process.env.PUBLIC_URL + "/assets/assets/up_gr.svg";
const downSVG = process.env.PUBLIC_URL + "/assets/assets/down_rd.svg";
export default function({asset = {}}) {
	const history = useHistory();
	if (!_.isNil(asset)) console.log(asset);

	const splitPrice = React.useMemo(() => (asset?.current_price ? formatNumber(asset.current_price).split(".") : ["-"]), [asset]);
	const splitMarketCap = React.useMemo(() => (asset?.marketcap ? formatNumber(asset.marketcap).split(".") : ["-"]), [asset]);
	const diffPercent = React.useMemo(() => (asset?.change_range ? divide(asset.change_range, 100, 2) : undefined), [asset]);

	const chartValues = React.useMemo(() => {
		if (empty(asset.prices)) return [];
		return _.map(asset.prices, v => {
			const arr = _.reverse(_.valuesIn(v));
			arr[0] = new moment(arr[0]).valueOf();
			return arr;
		});
	}, [asset.prices]);
	return (
		<div className={cx("statuscard-wrapper")} onClick={() => history.push(`/assets/${asset?.asset}`)}>
			<div className={cx("wrapper")}>
				<div className={cx("asset-graph-wrapper")}>
					<div className={cx("asset")}>
						<img src={asset?.asset_img ? asset?.asset_img : symbolNoneSVG} alt={"none"} />
						<div className={cx("name")}>{asset?.mapped_asset ? asset.mapped_asset : "-"}</div>
					</div>
					<div className={cx("graph-wrapper")}>
						{empty(chartValues) ? undefined : <Chart key={0} options={options} data={chartValues} showAxis={false} displayMax={true} />}
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
