import * as React from "react";
import styles from "./TableRow.scss";
import cn from "classnames/bind";
import {useHistory} from "src/hooks";
import tooltips from "src/constants/tooltips";
import {_, formatNumber, reduceString} from "src/lib/scripts";
import {fixed} from "src/lib/Big";
//  components
import {Fade, TableCell, TableRow, Tooltip} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import DisplayIcon from "src/components/common/DisplayIcon";
//  assets
import symbolNoneSVG from "src/assets/transactions/symbol_none.svg";
// import humanFormat from "human-format";

const cx = cn.bind(styles);

// const hfScale = new humanFormat.Scale({
// 	k: 1000,
// 	million: 1000000,
// 	billion: 1000000000,
// 	trillion: 1000000000000,
// 	quadrillion: 1000000000000000,
// 	Quintillion: 1000000000000000000,
// });

export const ThinTableRow = ({asset, displayNone}) => {
	const history = useHistory();

	// const formattedMarketCap = !_.isNil(asset.marketCap) ? formatNumber(Math.round(asset.marketCap)) : undefined;
	const formattedPrice = !_.isNil(asset.price) ? formatNumber(fixed(asset.price)).split(".") : undefined;
	const formattedSupply = !_.isNil(asset.supply) ? formatNumber(fixed(asset.supply)).split(".") : undefined;
	return (
		<div key={asset.id} className={cx("AssetList-thinTableRow", {invisible: displayNone})}>
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
				<li>Market Cap(USD)</li>
				{/*<li className={cx("number-wrapper")}>{formattedMarketCap ? <>{formattedMarketCap}</> : <Skeleton />}</li>*/}
				<li className={cx("number-wrapper")}>{!_.isNil(asset.marketCap) ? formatNumber(asset.marketCap) : <Skeleton />}</li>
			</ul>
			<ul className={cx("row")}>
				<li>Price(USD)</li>
				<li className={cx("number-wrapper")}>
					{formattedPrice ? (
						<>
							{asset.price !== 0 ? (
								<>
									{`${formattedPrice[0]}.`}
									<span>{formattedPrice[1]}</span>
								</>
							) : (
								"-"
							)}
						</>
					) : (
						<Skeleton />
					)}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>Supply</li>
				<li className={cx("number-wrapper")}>
					{formattedSupply ? (
						<>
							{formattedSupply[0]}
							{formattedSupply[1] ? (
								<>
									.<span>{formattedSupply[1]}</span>
								</>
							) : (
								undefined
							)}
						</>
					) : (
						<Skeleton />
					)}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>Owner</li>
				<li className={cx("owner")} onClick={() => history.push(`/account/${asset.owner}`)}>
					{asset.owner ? reduceString(asset.owner, 6, 6) : <Skeleton />}
				</li>
			</ul>
		</div>
	);
};

export default function({asset, displayNone}) {
	const history = useHistory();
	const formattedMarketCap = !_.isNil(asset.marketCap) ? formatNumber(Math.round(asset.marketCap)) : undefined;
	const formattedPrice = !_.isNil(asset.price) ? formatNumber(fixed(asset.price)).split(".") : undefined;
	const formattedSupply = !_.isNil(asset.supply) ? formatNumber(fixed(asset.supply)).split(".") : undefined;
	return (
		<TableRow className={cx("AssetList-tableRow", {invisible: displayNone})} key={asset.id}>
			<TableCell className={cx("tableCell", "nameCell")} component='th' scope='row' alignt='left'>
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
			</TableCell>
			<TableCell className={cx("tableCell")} component='th' scope='row' align='right'>
				<Tooltip
					placement='bottom-end'
					TransitionComponent={Fade}
					TransitionProps={{timeout: 300}}
					title={tooltips.asset_cap}
					disableFocusListener
					disableTouchListener>
					{formattedMarketCap ? <div className={cx("number-wrapper")}>{asset.price !== 0 ? `${formattedMarketCap}` : "-"}</div> : <Skeleton />}
				</Tooltip>
			</TableCell>
			<TableCell className={cx("tableCell")} component='th' scope='row' align='right'>
				<Tooltip
					placement='bottom-end'
					TransitionComponent={Fade}
					TransitionProps={{timeout: 300}}
					title={tooltips.asset_price}
					disableFocusListener
					disableTouchListener>
					{formattedPrice ? (
						<div className={cx("number-wrapper")}>
							{asset.price !== 0 ? (
								<>
									{`${formattedPrice[0]}.`}
									<span>{formattedPrice[1]}</span>
								</>
							) : (
								"-"
							)}
						</div>
					) : (
						<Skeleton />
					)}
				</Tooltip>
			</TableCell>
			<TableCell className={cx("tableCell")} component='th' scope='row' align='right'>
				<Tooltip
					placement='bottom-end'
					TransitionComponent={Fade}
					TransitionProps={{timeout: 300}}
					title={tooltips.asset_supply}
					disableFocusListener
					disableTouchListener>
					{formattedSupply ? (
						<div className={cx("number-wrapper")}>
							{formattedSupply[0]}
							{formattedSupply[1] ? (
								<>
									.<span>{formattedSupply[1]}</span>
								</>
							) : (
								undefined
							)}
						</div>
					) : (
						<Skeleton />
					)}
				</Tooltip>
			</TableCell>
			<TableCell className={cx("tableCell")} component='th' scope='row' align='right'>
				<Tooltip
					placement='bottom-end'
					TransitionComponent={Fade}
					TransitionProps={{timeout: 300}}
					title={tooltips.asset_owner}
					disableFocusListener
					disableTouchListener>
					<div className={cx("owner")} onClick={() => history.push(`/account/${asset.owner}`)}>
						{asset.owner ? reduceString(asset.owner, 6, 6) : <Skeleton />}
					</div>
				</Tooltip>
			</TableCell>
		</TableRow>
	);
}
