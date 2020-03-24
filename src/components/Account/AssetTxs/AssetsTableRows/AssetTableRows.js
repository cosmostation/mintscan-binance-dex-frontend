import React from "react";
import cn from "classnames/bind";
import styles from "./AssetTableRows.scss";

//  hooks
import {useHistory} from "src/hooks";

//  components
import {Fade, TableCell, TableRow, Tooltip} from "@material-ui/core";
import {_, formatNumber} from "src/lib/scripts";
import {sumArray, multiply} from "src/lib/Big";
import Decimal from "src/components/common/Decimal";
import tooltips from "src/constants/tooltips";
import Skeleton from "react-skeleton-loader";

const cx = cn.bind(styles);
const symbolNoneSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";

export const ThinTableRows = ({asset = {}, price = 1}) => {
	const history = useHistory();
	const assetSum = React.useMemo(() => getTotalSum(asset), [asset]);
	return (
		<div className={cx("Asset-thinTableRow")}>
			<div className={cx("divider")} />
			<div className={cx("section-wrapper")}>
				{asset.name ? (
					<div className={cx("nameImg-wrapper")} onClick={() => history.push(`/assets/${asset.asset}`)}>
						<img src={asset?.assetImg ? asset?.assetImg : symbolNoneSVG} alt={"alt"} />
						<div className={cx("name-wrapper")}>
							<div>{asset.mappedAsset}</div>
							<div className={cx("name")}>{asset.name}</div>
						</div>
					</div>
				) : (
					<Skeleton />
				)}
			</div>
			<div className={cx("divider")} />
			<ul className={cx("row")}>
				<li>Total Balance</li>
				{/*<li className={cx("number-wrapper")}>{formattedMarketCap ? <>{formattedMarketCap}</> : <Skeleton />}</li>*/}
				<li className={cx("number-wrapper")}>{!_.isNil(assetSum) ? formatNumber(assetSum) : <Skeleton />}</li>
			</ul>
			<ul className={cx("row")}>
				<li>Estimated Value</li>
				{/*<li className={cx("number-wrapper")}>{formattedMarketCap ? <>{formattedMarketCap}</> : <Skeleton />}</li>*/}
				<li className={cx("number-wrapper")}>${!_.isNil(assetSum) ? formatNumber(multiply(assetSum, price, 2)) : <Skeleton />}</li>
			</ul>
			<ul className={cx("row")}>
				<li>Available</li>
				{/*<li className={cx("number-wrapper")}>{formattedMarketCap ? <>{formattedMarketCap}</> : <Skeleton />}</li>*/}
				<li className={cx("number-wrapper")}>{!_.isNil(asset.free) ? formatNumber(asset.free) : <Skeleton />}</li>
			</ul>
			<ul className={cx("row")}>
				<li>Freeze</li>
				{/*<li className={cx("number-wrapper")}>{formattedMarketCap ? <>{formattedMarketCap}</> : <Skeleton />}</li>*/}
				<li className={cx("number-wrapper")}>{!_.isNil(asset.frozen) ? formatNumber(asset.frozen) : <Skeleton />}</li>
			</ul>
			<ul className={cx("row")}>
				<li>In Order</li>
				{/*<li className={cx("number-wrapper")}>{formattedMarketCap ? <>{formattedMarketCap}</> : <Skeleton />}</li>*/}
				<li className={cx("number-wrapper")}>{!_.isNil(asset.locked) ? formatNumber(asset.locked) : <Skeleton />}</li>
			</ul>
		</div>
	);
};

export default function({asset, price = 1}) {
	const history = useHistory();
	const assetSum = React.useMemo(() => getTotalSum(asset), [asset]);
	return (
		<TableRow className={cx("AssetTableRows-wrapper")} hover={true}>
			<TableCell className={cx("tableCell-asset", "text")} component='th' scope='row'>
				<div className={cx("assetDisplay-wrapper")} onClick={() => history.push(`/assets/${asset.symbol}`)}>
					<img src={asset.assetImg ? asset.assetImg : symbolNoneSVG} alt={"assetImg"} />
					<div className={cx("text-wrapper")}>
						<p className={cx("title")}>{asset.mappedAsset}</p>
						<p className={cx("content")}>{asset.name}</p>
					</div>
				</div>
			</TableCell>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row' align='right'>
				<Tooltip
					placement='bottom-end'
					TransitionComponent={Fade}
					TransitionProps={{timeout: 300}}
					title={tooltips.acc_assets_TOTAL_BALANCE}
					disableFocusListener
					disableTouchListener>
					<div className={cx("num-wrapper")}>
						<Decimal fontSizeBase={13} value={formatNumber(assetSum)} bottom={0} marginRight={0} />
					</div>
				</Tooltip>
			</TableCell>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row' align='right'>
				<Tooltip
					placement='bottom-end'
					TransitionComponent={Fade}
					TransitionProps={{timeout: 300}}
					title={tooltips.acc_assets_ESTIMATED_VALUE}
					disableFocusListener
					disableTouchListener>
					<div className={cx("num-wrapper")}>
						<Decimal fontSizeBase={13} value={formatNumber(multiply(assetSum, price, 2))} bottom={0} marginRight={0} />
					</div>
				</Tooltip>
			</TableCell>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row' align='right'>
				<Tooltip
					placement='bottom-end'
					TransitionComponent={Fade}
					TransitionProps={{timeout: 300}}
					title={tooltips.acc_assets_AVAILABLE}
					disableFocusListener
					disableTouchListener>
					<div className={cx("num-wrapper")}>
						<Decimal fontSizeBase={13} value={formatNumber(asset.free)} bottom={0} marginRight={0} />
					</div>
				</Tooltip>
			</TableCell>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row' align='right'>
				<Tooltip
					placement='bottom-end'
					TransitionComponent={Fade}
					TransitionProps={{timeout: 300}}
					title={tooltips.acc_assets_FREEZE}
					disableFocusListener
					disableTouchListener>
					<div className={cx("num-wrapper")}>
						{asset.frozen > 0 ? <Decimal fontSizeBase={13} value={formatNumber(asset.frozen)} bottom={0} marginRight={0} /> : "-"}
					</div>
				</Tooltip>
			</TableCell>
			<TableCell className={cx("tableCell", "text")} component='th' scope='row' align='right'>
				<Tooltip
					placement='bottom-end'
					TransitionComponent={Fade}
					TransitionProps={{timeout: 300}}
					title={tooltips.acc_assets_LOCKED}
					disableFocusListener
					disableTouchListener>
					<div className={cx("num-wrapper")}>
						{asset.locked > 0 ? <Decimal fontSizeBase={13} value={formatNumber(asset.locked)} bottom={0} marginRight={0} /> : "-"}
					</div>
				</Tooltip>
			</TableCell>
		</TableRow>
	);
}

const getTotalSum = asset => {
	return sumArray([asset.free, asset.locked, asset.frozen]);
};
