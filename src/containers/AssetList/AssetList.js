import React from "react";
import cn from "classnames/bind";
import styles from "./AssetList.scss";
import {_, empty} from "src/lib/scripts";
//  redux
import {useDispatch, useSelector} from "react-redux";
import {getCryptoAssets, getCryptoBep8} from "src/store/modules/assets";
//  hooks
import {useFetch, useIncrementalListLoader} from "src/hooks";
//  components
import StatusCard from "src/components/AssetList/StatusCard/StatusCard";
import Table from "src/components/AssetList/Table";
import ScrollTop from "src/components/common/ScrollTop";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

export default function(props) {
	const dispatch = useDispatch();
	const [charts] = useFetch(`${consts.API_BASE}${consts.API.CHARTS}`);
	const [tab, setTab] = React.useState("BEP2");
	const assets = useSelector(state => state.assets.assets);
	const bep8Assets = useSelector(state => state.assets.bep8);
	const [incrementalAssets, filledAssets, setAssets] = useIncrementalListLoader();

	React.useEffect(() => {
		if (empty(assets)) dispatch(getCryptoAssets());
		if (empty(bep8Assets)) dispatch(getCryptoBep8());
	}, [assets, dispatch, tab]);

	React.useEffect(() => {
		setAssets(assets);
	}, [tab, assets, setAssets]);
	//
	// React.useEffect(() => {
	// 	if (filledAssets.length === assets.length || assets.length === 0) return;
	// 	setAssets(assets);
	// }, [setAssets, assets, filledAssets]);

	return (
		<div className={cx("AssetList")}>
			<div className={cx("title-wrapper")}>
				<h1>Assets</h1>
				<div className={cx("tab-wrapper")}>
					<button onClick={() => setTab("BEP2")} className={cx({selected: tab === "BEP2"})}>
						<p>BEP2</p>
					</button>
					<button onClick={() => setTab("BEP8")} className={cx({selected: tab === "BEP8"})}>
						<p>Minitoken(BEP8)</p>
					</button>
				</div>
			</div>
			<div className={cx("StatusCard-grid", {hide: tab !== "BEP2"})}>
				{_.times(4, v => (
					<StatusCard asset={charts.data?.[v]} key={v} />
				))}
			</div>
			<Table assets={incrementalAssets} hide={tab !== "BEP2"} />
			<Table assets={bep8Assets} hide={tab !== "BEP8"} />
			{/*<Table assets={incrementalAssets} hide={false} />*/}
			{/*<Table assets={bep8Assets} hide={false} />*/}
			<ScrollTop />
		</div>
	);
}
