import * as React from "react";
import cn from "classnames/bind";
import styles from "./Tx.scss";

import {_, empty} from "src/lib/scripts";
import consts from "src/constants/consts";

//  components
import TitleWrapper from "src/components/common/TitleWrapper";
import TxInfo from "src/components/Tx/TxInfo";
import TxData from "src/components/Tx/TxData";
import PageTitle from "src/components/common/PageTitle";

import MockData from "src/containers/Tx/MockData";

const cx = cn.bind(styles);
const baseURL = `${consts.API_BASE}${consts.API.TXLIST}?&limit=1`;
export default function(props) {
	const txHash = props.match.params?.tx;
	const [data, setData] = React.useState({data: {data: {}}});
	// script that will query data when data is here
	React.useEffect(() => {
		if (txHash === "test") {
			setData({data: {data: _.sample(MockData)}});
		}
	}, []);

	return (
		<div className={cx("Tx")}>
			<TitleWrapper>
				<PageTitle title={"Transaction details"} />
			</TitleWrapper>
			{empty(data.data.data) ? (
				undefined
			) : (
				<>
					<TxInfo txData={data.data.data} />
					<TxData txData={data.data.data} />
				</>
			)}
		</div>
	);
}
