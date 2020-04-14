import React from "react";
import cn from "classnames/bind";
import styles from "./AssetList.scss";
import {_, empty} from "src/lib/scripts";
//  redux
import {useDispatch, useSelector} from "react-redux";
import {getCryptoAssets} from "src/store/modules/assets";
//  hooks
import {useFetch, useIncrementalListLoader} from "src/hooks";
//  components
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusCard from "src/components/AssetList/StatusCard/StatusCard";
import Table from "src/components/AssetList/Table";
import ScrollTop from "src/components/common/ScrollTop";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

export default function(props) {
	const dispatch = useDispatch();
	const assets = useSelector(state => state.assets.assets);
	const [charts] = useFetch(`${consts.API_BASE}${consts.API.CHARTS}`);
	const [incrementalAssets, filledAssets, setAssets] = useIncrementalListLoader();

	React.useEffect(() => {
		if (!empty(assets)) return;
		dispatch(getCryptoAssets());
	}, [assets, dispatch]);

	React.useEffect(() => {
		if (filledAssets.length === assets.length || assets.length === 0) return;
		setAssets(assets);
	}, [setAssets, assets, filledAssets]);

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
			<Table assets={incrementalAssets} />
			<ScrollTop />
		</div>
	);
}
