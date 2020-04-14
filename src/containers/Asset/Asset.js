import React from "react";
import cn from "classnames/bind";
import style from "./Asset.scss";
import {useFetch, usePrevious} from "src/hooks";
import {nilCheck} from "src/lib/scripts";

import consts from "src/constants/consts";
//  components
import PageTitle from "src/components/common/PageTitle";
import TitleWrapper from "src/components/common/TitleWrapper";
import AssetDetails from "src/components/Asset/Details";
import NotFound from "src/components/common/NotFound";
import TxHolders from "src/components/Asset/TxHolders";

const cx = cn.bind(style);

export default function Asset(props) {
	const {asset} = props.match.params;
	const prevAsset = usePrevious(asset);
	const [state, , setUrl] = useFetch(`${consts.API_BASE}${consts.API.ASSET}${asset}`);

	// navigation(asset change)
	React.useEffect(() => {
		if (nilCheck([asset, prevAsset]) || asset === prevAsset) return;
		setUrl(`${consts.API_BASE}${consts.API.ASSET}${asset}`);
	}, [asset, prevAsset, setUrl]);
	//  navigation
	// React.useEffect(() => {
	// 	console.log("action", action, asset);
	// 	if ((action === "PUSH" || (action === "POP" && !empty(state.data))) && !state.loading) {
	// 		console.log("entered url hit");
	// 		setUrl(`${consts.API_BASE}${consts.API.ASSET}${asset}`);
	// 	}
	// }, [asset, action, setUrl, state.data, state.loading]);
	if ((!state.loading && state?.data?.asset === "") || asset === "notFound") return <NotFound />;
	return (
		<div className={cx("Asset-wrapper")}>
			<TitleWrapper>
				<PageTitle title={"Asset Details"} />
			</TitleWrapper>
			<AssetDetails asset={state.data ? state.data : {}} />
			<TxHolders asset={asset} />
		</div>
	);
}
