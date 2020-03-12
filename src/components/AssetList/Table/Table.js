import * as React from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";
import {_, searchProperties, compareProperty} from "src/lib/scripts";

import {TableBody, InputBase, Table, TableCell, TableHead, TableRow} from "@material-ui/core";
import AssetTableRow, {ThinTableRow} from "../TableRow";

const cx = classNames.bind(styles);

const ORDER_TYPES = Object.freeze(["NAME", "MARKET_CAP", "PRICE", "SUPPLY"]);
const ORDER_COMPARE = Object.freeze(["name", "marketCap", "price", "supply"]);
const SEARCH_PROPERTY = Object.freeze(["asset", "mappedAsset", "name", "owner"]);
export default function({assets}) {
	const [search, setSearch] = React.useState("");
	const [orderBy, setOrderBy] = React.useState(1);
	const [asc, setAsc] = React.useState(false);
	const tableHeaderRender = React.useMemo(
		() => (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell", "nameCell")}>Name</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						Market Cap(USD)
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						Price
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						Supply
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "OwnerCell")} align='left'>
						Owner
					</TableCell>
				</TableRow>
			</TableHead>
		),
		[]
	);

	//  show default table if search is not set
	//  show searched(filtered results) if search is set
	//  rerender if assets order is changed(clicked on the graph button thingy
	const displayAssets = React.useMemo(() => {
		let filteredAssets = assets;
		//  trim search when user enters
		if (search !== "") {
			filteredAssets = _.filter(assets, v => searchProperties(v, SEARCH_PROPERTY, search));
		}
		if (orderBy === 1) return asc ? _.reverse(filteredAssets) : filteredAssets;
		else if (_.includes([0, 2, 3], orderBy)) return filteredAssets.sort((a, b) => compareProperty(a, b, ORDER_COMPARE[orderBy]), asc);
		console.error(`orderBy is not a possible value - ${orderBy}`);
		return filteredAssets;
	}, [assets, search, orderBy, asc]);

	const tableBodyRender = React.useMemo(() => {
		return (
			<TableBody>
				{_.map(displayAssets, asset => (
					<AssetTableRow key={asset.id} asset={asset} />
				))}
			</TableBody>
		);
	}, [displayAssets]);

	const thinTableBodyRender = React.useMemo(() => {
		return (
			<div className={cx("table-thin")}>
				<div className={cx("thinTableRows-wrapper")}>
					{_.map(displayAssets, asset => (
						<ThinTableRow asset={asset} />
					))}
				</div>
			</div>
		);
	});

	return (
		<div className={cx("AssetsTable-wrapper")}>
			<div className={cx("search-wrapper")}>
				<div className={cx("search")}>
					<InputBase className={cx("input")} placeholder='Search assets' onKeyPress={() => {}} onChange={() => {}} />
				</div>
				<button className={cx("searchBtn")} onClick={() => {}}>
					Search
				</button>
			</div>
			<Table className={cx("table")}>
				{tableHeaderRender}
				{tableBodyRender}
			</Table>
			{thinTableBodyRender}
		</div>
	);
}
