import React from "react";
import cn from "classnames/bind";
import styles from "./AssetList.scss";
import {_, empty} from "src/lib/scripts";
//  redux
import {useDispatch, useSelector} from "react-redux";
import {getCryptoAssets} from "src/store/modules/assets";
//  components
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusCard from "src/components/AssetList/StatusCard/StatusCard";
import Table from "src/components/AssetList/Table";
import ScrollTop from "src/components/common/ScrollTop";

const cx = cn.bind(styles);

const top = ["TUSDB", "USDSB", "BTCB", "IRIS"];
const geckoTop = ["true-usd", "stableusd", "bitcoin-bep2", "iris-network"];

export default function(props) {
	const dispatch = useDispatch();
	const [topAssets, setTopAssets] = React.useState([]);
	const assets = useSelector(state => state.assets.assets);

	React.useEffect(() => {
		if (!empty(assets)) return;
		dispatch(getCryptoAssets());
	}, [assets, dispatch]);

	React.useEffect(() => {
		if (!empty(topAssets) || empty(assets)) return;
		setTopAssets(_.filter(assets, v => _.includes(top, v.mappedAsset)));
	}, [topAssets, assets]);
	return (
		<div className={cx("AssetList")}>
			<TitleWrapper>
				<PageTitle title={"Assets"} />
			</TitleWrapper>
			<div className={cx("StatusCard-grid")}>
				<StatusCard asset={topAssets?.[0]} id={geckoTop[0]} />
				<StatusCard asset={topAssets?.[1]} id={geckoTop[1]} />
				<StatusCard asset={topAssets?.[2]} id={geckoTop[2]} />
				<StatusCard asset={topAssets?.[3]} id={geckoTop[3]} />
			</div>
			<Table assets={assets} />
			<ScrollTop />
		</div>
	);
}
