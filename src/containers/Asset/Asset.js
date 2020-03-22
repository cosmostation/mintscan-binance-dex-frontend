import React from "react";
import cn from "classnames/bind";
import style from "./Asset.scss";
import {useFetch, useHistory} from "src/hooks";
import {empty} from "src/lib/scripts";

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
	const history = useHistory();
	const [state, , setUrl] = useFetch(`${consts.API_BASE}${consts.API.ASSET}${asset}`);

	React.useEffect(() => {
		console.log("action", history.action);
		if (history.action === "PUSH" || (history.action === "POP" && !empty(state.data))) {
			console.log("entered url hit");
			setUrl(`${consts.API_BASE}${consts.API.ASSET}${asset}`);
		}
	}, [asset, history.action, setUrl]);
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
