import React from "react";
import styles from "./StatusCard.scss";
import classNames from "classnames/bind";
import Moment from "moment";
import {_, empty, formatNumber} from "src/lib/scripts";
import {divide, fixed} from "src/lib/Big";
import {useHistory} from "src/hooks";
//  components
import Chart from "src/components/common/Chart/Chart";
import DisplayIcon from "src/components/common/DisplayIcon";
import Spinner from "src/components/common/Spinner";
//  assets
import upSVG from "src/assets/assets/up_gr.svg";
import downSVG from "src/assets/assets/down_rd.svg";

const cx = classNames.bind(styles);
export default function({asset = {}}) {
	const history = useHistory();

	const splitPrice = React.useMemo(() => (asset?.current_price ? formatNumber(fixed(asset.current_price, 8)).split(".") : ["-"]), [asset]);
	const splitMarketCap = React.useMemo(() => (asset?.marketcap ? formatNumber(asset.marketcap).split(".") : ["-"]), [asset]);
	const diffPercent = React.useMemo(() => (asset?.change_range ? divide(asset.change_range, 100, 2) : undefined), [asset]);

	const chartValues = React.useMemo(() => {
		if (empty(asset.prices)) return [];
		const values = _.map(asset.prices, v => {
			const arr = _.reverse(_.valuesIn(v));
			arr[0] = Math.floor(new Moment(arr[0]).valueOf() / 1000);
			return arr;
		});
		return values.sort((a, b) => (a[0] <= b[0] ? -1 : 1));
	}, [asset.prices]);
	return (
		<div className={cx("statuscard-wrapper")} onClick={() => history.push(`/assets/${asset?.asset}`)}>
			<div className={cx("wrapper")}>
				<div className={cx("asset-graph-wrapper")}>
					<div className={cx("asset")}>
						<DisplayIcon image={asset?.asset_img} size={30} />
						<div className={cx("name")}>{asset?.mapped_asset ? asset.mapped_asset : "-"}</div>
					</div>
					<div className={cx("graph-wrapper")}>
						{empty(chartValues) ? (
							<Spinner styles={{minHeight: "47px"}} />
						) : (
							<Chart key={0} options={options} data={chartValues} showAxis={false} displayMax={true} />
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
				<div className={cx("market-cap")}>{splitMarketCap[0] === "-" ? "$ -" : <>$ {splitMarketCap[0]}</>}</div>
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
