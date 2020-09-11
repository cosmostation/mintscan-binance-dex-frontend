import React from "react";
import cn from "classnames/bind";
import styles from "./AssetTxs.scss";
import {_, empty} from "src/lib/scripts";
//  reduxy
import {useSelector} from "react-redux";
//  hooks
import {usePrevious} from "src/hooks";
//  components
import TxTable from "./TxTable";
import AssetsTable from "src/components/Account/AssetTxs/AssetsTable";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

export default function({fetchAccountTxs = () => {}, balances = [], prices = [], txData = [], account = ""}) {
	const assets = useSelector(state => state.assets.assets);
	const bep8 = useSelector(state => state.assets.bep8);

	const allAssets = React.useMemo(() => {
		if (empty(assets) || empty(bep8)) return null;
		return [...assets, ...bep8];
	}, [assets, bep8]);
	const [mappedAssets, setMappedAssets] = React.useState([]);
	const [selected, setSelected] = React.useState(true);
	const onClick = React.useCallback((e, bool) => {
		e.stopPropagation();
		e.preventDefault();
		setSelected(bool);
	}, []);

	React.useEffect(() => {
		if (!selected && empty(txData)) fetchAccountTxs();
	}, [fetchAccountTxs, selected, txData]);

	//  pick from the assets, append asset imgSrc and relevent names to balance
	React.useEffect(() => {
		//  check for new rows
		if (empty(allAssets) || _.every(balances, (v, i) => mappedAssets[i]?.symbol === v?.symbol)) return;
		console.log("mapping assets");
		const tempAssets = _.cloneDeep(balances);
		_.each(tempAssets, v => {
			const found = _.find(allAssets, asset => asset.asset === v.symbol);
			if (found) _.assign(v, {mappedAsset: found.mappedAsset, name: found.name, assetImg: found.assetImg});
		});
		setMappedAssets(tempAssets);
	}, [assets, balances, mappedAssets]);

	const prevBalances = usePrevious(balances);
	//  if balance has changed, just update that
	React.useEffect(() => {
		if (empty(prevBalances) || _.isEqual(prevBalances, balances) || empty(mappedAssets)) return;
		setMappedAssets(v => _.merge(v, balances));
		// console.log("merge new values");
	}, [balances, mappedAssets, prevBalances]);

	const txTable = React.useMemo(() => <TxTable txData={txData} account={account} />, [txData, account]);
	const assetTable = React.useMemo(() => <AssetsTable balances={mappedAssets ? mappedAssets : []} prices={prices} />, [mappedAssets, prices]);
	return React.useMemo(
		() => (
			<div className={cx("AssetTxs-wrapper")}>
				<div className={cx("Tabs")}>
					<div className={cx("Tab", selected ? "selected" : undefined)} onClick={e => onClick(e, true)}>
						Assets
					</div>
					<div className={cx("Tab", !selected ? "selected" : undefined)} onClick={e => onClick(e, false)}>
						Transactions
					</div>
				</div>
				<div className={cx("Card")}>
					<div className={cx(selected ? undefined : "unselected")}>{assetTable}</div>
					<div className={cx(!selected ? undefined : "unselected")}>{txTable}</div>
				</div>
			</div>
		),
		[assetTable, onClick, selected, txTable]
	);
}
