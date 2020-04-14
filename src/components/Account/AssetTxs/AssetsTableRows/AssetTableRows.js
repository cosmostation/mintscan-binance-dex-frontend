import React from "react";
import cn from "classnames/bind";
import styles from "./AssetTableRows.scss";
//  hooks
import {useHistory} from "src/hooks";
//  components
import {Fade, TableCell, TableRow, Tooltip} from "@material-ui/core";
import {_, formatNumber} from "src/lib/scripts";
import {multiply, sumArray} from "src/lib/Big";
import Decimal from "src/components/common/Decimal";
import tooltips from "src/constants/tooltips";
import Skeleton from "react-skeleton-loader";
import DisplayIcon from "src/components/common/DisplayIcon/DisplayIcon";
//  assets
import symbolNoneSVG from "src/assets/transactions/symbol_none.svg";

const cx = cn.bind(styles);

export const ThinTableRows = ({asset = {}, price = 1}) => {
	const history = useHistory();

	const assetSum = React.useMemo(() => getTotalSum(asset), [asset]);
	return (
		<div className={cx("Asset-thinTableRow")}>
			<div className={cx("divider")} />
			<div className={cx("section-wrapper")}>
				{asset.name ? (
					<div className={cx("nameImg-wrapper")} onClick={() => history.push(`/assets/${asset.asset}`)}>
						<DisplayIcon image={asset?.assetImg ? asset?.assetImg : symbolNoneSVG} size={30} />
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
				<li className={cx("number-wrapper")}>{!_.isNil(assetSum) ? formatNumber(assetSum) : <Skeleton />}</li>
			</ul>
			<ul className={cx("row")}>
				<li>Estimated Value</li>
				<li className={cx("number-wrapper")}>${!_.isNil(assetSum) ? formatNumber(multiply(assetSum, price, 2)) : <Skeleton />}</li>
			</ul>
			<ul className={cx("row")}>
				<li>Available</li>
				<li className={cx("number-wrapper")}>{!_.isNil(asset.free) ? formatNumber(asset.free) : <Skeleton />}</li>
			</ul>
			<ul className={cx("row")}>
				<li>Freeze</li>
				<li className={cx("number-wrapper")}>{!_.isNil(asset.frozen) ? formatNumber(asset.frozen) : <Skeleton />}</li>
			</ul>
			<ul className={cx("row")}>
				<li>In Order</li>
				<li className={cx("number-wrapper")}>{!_.isNil(asset.locked) ? formatNumber(asset.locked) : <Skeleton />}</li>
			</ul>
		</div>
	);
};
//bnb1z35wusfv8twfele77vddclka9z84ugywug48gn
export default function({asset, price = 1}) {
	const history = useHistory();
	const assetSum = React.useMemo(() => getTotalSum(asset), [asset]);
	return (
		<TableRow className={cx("AssetTableRows-wrapper")} hover={true}>
			<TableCell className={cx("tableCell-asset", "text")} component='th' scope='row'>
				<div className={cx("assetDisplay-wrapper")} onClick={() => history.push(`/assets/${asset.symbol}`)}>
					<DisplayIcon image={asset?.assetImg ? asset?.assetImg : symbolNoneSVG} size={30} />
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
						{assetSum <= 0 ? <span className={cx("smaller")}>{"＜"}</span> : undefined}
						<Decimal fontSizeBase={13} value={formatNumber(returnSmaller(assetSum))} bottom={0} marginRight={0} />
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
						{price ? (
							<>
								{assetSum <= 0 ? <span className={cx("smaller")}>{"＜"}</span> : undefined}
								<Decimal fontSizeBase={13} value={formatNumber(returnSmaller(multiply(assetSum, price, 2), 2))} bottom={0} marginRight={0} />
							</>
						) : (
							"Not Applicable"
						)}
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
						<Decimal fontSizeBase={13} value={formatNumber(asset.frozen)} bottom={0} marginRight={0} />
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
						<Decimal fontSizeBase={13} value={formatNumber(asset.locked)} bottom={0} marginRight={0} />
					</div>
				</Tooltip>
			</TableCell>
		</TableRow>
	);
}

const getTotalSum = asset => {
	return sumArray([asset.free, asset.locked, asset.frozen]);
};

const returnSmaller = (v, places = 8) => (v <= 0 ? `0.${_.times(places - 1, v => "0").join("")}1` : v);
