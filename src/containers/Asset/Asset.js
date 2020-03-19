import * as React from "react";
import cn from "classnames/bind";
import style from "./Asset.scss";
import {useFetch} from "src/hooks";

import consts from "src/constants/consts";

//  components
import PageTitle from "src/components/common/PageTitle";
import TitleWrapper from "src/components/common/TitleWrapper";
import AssetDetails from "src/components/Asset/Details";
import NotFound from "src/components/common/NotFound";
import TxHolders from "src/components/Asset/TxHolders";

const cx = cn.bind(style);

export default function Account(props) {
	const {asset} = props.match.params;
	const [state, , ] = useFetch(`${consts.API_BASE}${consts.API.ASSET}${asset}`);
	if (!state.loading && state?.data?.asset === "") return <NotFound />;
	const data = state.data ? state.data : {};
	return (
		<div className={cx("Asset-wrapper")}>
			<TitleWrapper>
				<PageTitle title={"Asset Details"} />
			</TitleWrapper>
			<AssetDetails asset={data}/>
			<TxHolders asset={asset}/>
		</div>
	);
}
