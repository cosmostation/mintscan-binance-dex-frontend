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
import {useFetch} from "src/hooks";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

const top = ["TUSDB", "USDSB", "BTCB", "IRIS"];
const geckoTop = ["true-usd", "stableusd", "bitcoin-bep2", "iris-network"];

export default function(props) {
	const dispatch = useDispatch();
	const [topAssets, setTopAssets] = React.useState([]);
	const assets = useSelector(state => state.assets.assets);
	const [charts, refetch] = useFetch(`${consts.API_BASE}${consts.API.CHARTS}`);

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
				{_.times(4, v => (
					<StatusCard asset={charts.data?.[v]} key={v} />
				))}
			</div>
			<Table assets={assets} />
			<ScrollTop />
		</div>
	);
}
