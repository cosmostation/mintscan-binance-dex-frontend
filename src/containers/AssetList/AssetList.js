import * as React from "react";
import cn from "classnames/bind";
import styles from "./AssetList.scss";
import {empty} from "src/lib/scripts"

//  redux
import {useSelector, useDispatch} from "react-redux";
import {getCryptoAssets} from "src/store/modules/blockchain";

//  components
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusCard from "src/components/AssetList/StatusCard/StatusCard";
import Table from "src/components/AssetList/Table";
import ScrollTop from "src/components/common/ScrollTop";

const cx = cn.bind(styles);

export default function(props) {
	const dispatch = useDispatch();
	const assets = useSelector(state => state.blockchain.assets);

	React.useEffect(() => {
		if(!empty(assets)) return;
		dispatch(getCryptoAssets());
	}, [assets, dispatch]);
	return (
		<div className={cx("AssetList")}>
			<TitleWrapper>
				<PageTitle title={"Assets"} />
			</TitleWrapper>
			<div className={cx("StatusCard-grid")}>
				<StatusCard asset={assets?.[0]} />
				<StatusCard asset={assets?.[1]} />
				<StatusCard asset={assets?.[2]} />
				<StatusCard asset={assets?.[3]} />
			</div>
			<Table assets={assets} />
			<ScrollTop />
		</div>
	);
}
