import * as React from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";
import {_, searchProperties, compareProperty} from "src/lib/scripts";

//  components
import {TableBody, InputBase, Table, TableCell, TableHead, TableRow} from "@material-ui/core";
import AssetTableRow, {ThinTableRow} from "../TableRow";
import Search from "../Search";

const cx = classNames.bind(styles);

const ORDER_COMPARE = Object.freeze(["name", "marketCap", "price", "supply"]);
const SEARCH_PROPERTY = Object.freeze(["asset", "mappedAsset", "name"]);

// TODO
//  consider using react window if loading speeds are considered slow

export default function({assets}) {
	const [search, setSearch] = React.useState("");
	const [orderBy, setOrderBy] = React.useState(1);
	const [asc, setAsc] = React.useState(false);

	const displayAssets = React.useMemo(() => {
		let filteredAssets = assets;
		if (orderBy === 1) return asc ? _.reverse(filteredAssets) : filteredAssets;
		else if (_.includes([0, 2, 3], orderBy)) return filteredAssets.sort((a, b) => compareProperty(a, b, ORDER_COMPARE[orderBy]), asc);
		console.error(`orderBy is not a possible value - ${orderBy}`);
		return filteredAssets;
	}, [assets, orderBy, asc]);

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
					<TableCell className={cx("tableHeaderCell", "OwnerCell")} align='right'>
						Owner
					</TableCell>
				</TableRow>
			</TableHead>
		),
		[]
	);
	const tableBodyRender = React.useMemo(() => {
		return (
			<TableBody>
				{_.map(displayAssets, asset => {
					return (
						<AssetTableRow key={asset.id} asset={asset} displayNone={search !== "" ? !searchProperties(asset, SEARCH_PROPERTY, search.toUpperCase()) : false} />
					);
				})}
			</TableBody>
		);
	}, [displayAssets, search]);

	const thinTableBodyRender = React.useMemo(() => {
		return (
			<div className={cx("table-thin")}>
				<div className={cx("thinTableRows-wrapper")}>
					{_.map(displayAssets, asset => (
						<ThinTableRow key={asset.id} asset={asset} displayNone={search !== "" ? !searchProperties(asset, SEARCH_PROPERTY, search.toUpperCase()) : false} />
					))}
				</div>
			</div>
		);
	}, [displayAssets, search]);

	return (
		<div className={cx("AssetsTable-wrapper")}>
			<Search setSearch={setSearch} cx={cx} />
			<Table className={cx("table")}>
				{tableHeaderRender}
				{tableBodyRender}
			</Table>
			{thinTableBodyRender}
		</div>
	);
}
