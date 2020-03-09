import React from "react";
import cn from "classnames/bind";
import styles from "./AssetList.scss";

//  hooks
import useFetch from "src/hooks/useFetch/useFetch";

//  utils
import consts from "src/constants/consts";

//  components
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusCard from "src/components/Assets/StatusCard/StatusCard";
import Table from "src/components/Assets/Table";

const cx = cn.bind(styles);

export default function(props) {
	const [state, refetch, setUrl] = useFetch(`${consts.BINANCE_API_BASE}${consts.BINANCE_API.ASSETS}`);
	console.log(state);
	return (
		<div className={cx("AssetList")}>
			<TitleWrapper>
				<PageTitle title={"Assets"} />
			</TitleWrapper>
			<div className={cx("StatusCard-grid")}>
				<StatusCard />
				<StatusCard />
				<StatusCard />
				<StatusCard />
			</div>
			<Table />
		</div>
	);
}
