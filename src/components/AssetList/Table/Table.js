import * as React from "react";
import styles from "./Table.scss";
import classNames from "classnames/bind";
import {_, compareProperty, searchProperties} from "src/lib/scripts";
import consts from "src/constants/consts";
//  components
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import SortButton from "src/components/common/SortButton";
import AssetTableRow, {ThinTableRow} from "../TableRow";
import Search from "../Search";

const cx = classNames.bind(styles);

// TODO
//  consider using react window if loading speeds are considered slow
//  it is slow, but we need to not use MUI tables to fix the speed issue.
//  bloody material UI not making my life any easier

export default function({assets, hide}) {
	const [search, setSearch] = React.useState("");
	const [sort, setSort] = React.useState({orderBy: 1, asc: false});

	const displayAssets = React.useMemo(() => {
		let filteredAssets = [...assets];
		if (sort.orderBy === 1) filteredAssets = sort.asc ? _.reverse(filteredAssets) : filteredAssets;
		else if (_.includes([0, 2, 3], sort.orderBy)) {
			filteredAssets.sort((a, b) => compareProperty(a, b, consts.ASSET.ORDER_COMPARE[sort.orderBy], "id", sort.asc));
			if (sort.orderBy === 0) {
				//  CAS goes to the bottom of the list when alphabetically ordered in either direction because you confused me for hours by showing up first when doing so
				//  for reasons unknown to me.
				//  Use the proper English alphabet next time mate.
				const CAS = _.remove(filteredAssets, v => v.id === 51);
				filteredAssets.push(...CAS);
			}
		} else console.error(`orderBy is not a possible value - ${sort.orderBy}`);
		if (assets.length > 0) {
		}
		return filteredAssets;
	}, [assets, sort]);

	const clickHeader = React.useCallback(
		num => {
			// console.log("headerClicked - num", num);
			if (sort.orderBy === num) setSort(v => ({...v, asc: !sort.asc}));
			else {
				setSort({orderBy: num, asc: false});
			}
		},
		[sort]
	);

	const tableHeaderRender = React.useMemo(
		() => (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell", "nameCell")}>
						<div className={cx("header-content", "name")} onClick={e => clickHeader(0)}>
							<span>Name</span>
							<SortButton asc={sort.asc} active={sort.orderBy === 0} />
						</div>
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						<div className={cx("header-content")} onClick={e => clickHeader(1)}>
							<span>Market Cap(USD)</span>
							<SortButton asc={sort.asc} active={sort.orderBy === 1} />
						</div>
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						<div className={cx("header-content")} onClick={e => clickHeader(2)}>
							<span>Price(USD)</span>
							<SortButton asc={sort.asc} active={sort.orderBy === 2} />
						</div>
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						<div className={cx("header-content")} onClick={e => clickHeader(3)}>
							<span>Supply</span>
							<SortButton asc={sort.asc} active={sort.orderBy === 3} />
						</div>
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "OwnerCell")} align='right'>
						Owner
					</TableCell>
				</TableRow>
			</TableHead>
		),
		[sort, clickHeader]
	);
	const tableBodyRender = React.useMemo(() => {
		// const data = _.map(displayAssets, v => ({
		// 	key: v.id,
		// 	asset: v,
		// 	displayNone: search !== "" ? !searchProperties(v, consts.ASSET.NAME_SEARCH_PROPERTY, search.toUpperCase()) : false,
		// }));
		return (
			<TableBody>
				{/*// TODO : make this work in the future, probably tear out MUI tabels altogether*/}
				{/*<WindowedList data={data} Comp={AssetTableRow} itemCnt={data.length} />*/}
				{_.map(displayAssets, asset => {
					return (
						<AssetTableRow
							key={asset.id}
							asset={asset}
							displayNone={search !== "" ? !searchProperties(asset, consts.ASSET.NAME_SEARCH_PROPERTY, search.toUpperCase()) : false}
						/>
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
						<ThinTableRow
							key={asset.id}
							asset={asset}
							displayNone={search !== "" ? !searchProperties(asset, consts.ASSET.NAME_SEARCH_PROPERTY, search.toUpperCase()) : false}
						/>
					))}
				</div>
			</div>
		);
	}, [displayAssets, search]);
	return React.useMemo(
		() => (
			<div className={cx("AssetsTable-wrapper", {hide})}>
				<Search setSearch={setSearch} cx={cx} />
				<Table className={cx("table")}>
					{tableHeaderRender}
					{tableBodyRender}
				</Table>
				{thinTableBodyRender}
			</div>
		),
		[tableBodyRender, tableHeaderRender, thinTableBodyRender, hide]
	);
}
