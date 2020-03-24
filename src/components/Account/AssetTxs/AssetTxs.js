import React from "react";
import cn from "classnames/bind";
import styles from "./AssetTxs.scss";
import {_, empty} from "src/lib/scripts";

//  reduxy
import {useSelector} from "react-redux";

//  components
import TxTable from "./TxTable";
import AssetsTable from "src/components/Account/AssetTxs/AssetsTable";

const cx = cn.bind(styles);

export default function({balances = [], address = "", prices = []}) {
	const assets = useSelector(state => state.assets.assets);
	const [mappedAssets, setMappedAssets] = React.useState([]);
	const [selected, setSelected] = React.useState(true);
	const onClick = React.useCallback((e, bool) => {
		e.stopPropagation();
		e.preventDefault();
		setSelected(bool);
	}, []);

	//  pick from the assets, append asset imgSrc and relevent names to balance
	React.useEffect(() => {
		if (empty(assets) || empty(balances) || !_.isNil(balances?.[0]?.name) || !empty(mappedAssets)) return;
		const tempAssets = _.cloneDeep(balances);
		_.each(tempAssets, v => {
			const found = _.find(assets, asset => asset.asset === v.symbol);
			if (found) _.assign(v, {mappedAsset: found.mappedAsset, name: found.name, assetImg: found.assetImg});
		});
		setMappedAssets(tempAssets);
	}, [assets, balances, mappedAssets]);

	const txTable = React.useMemo(() => <TxTable address={address ? address : ""} />, [address]);
	const assetTable = React.useMemo(() => <AssetsTable balances={mappedAssets ? mappedAssets : []} prices={prices} />, [mappedAssets, prices]);

	return (
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
	);
}
