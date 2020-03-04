import * as React from "react";
import cn from "classnames/bind";
import styles from "./Tx.scss";

import {_, empty, refineAddress} from "src/lib/scripts";
import consts from "src/constants/consts";
import useFetch from "src/hooks/useFetch/useFetch";
import MockData from "src/containers/Tx/MockData";

//  components
import TitleWrapper from "src/components/common/TitleWrapper";
import TxInfo from "src/components/Tx/TxInfo";
import TxData from "src/components/Tx/TxData";
import PageTitle from "src/components/common/PageTitle";
import NotFound from "src/components/common/NotFound";

const cx = cn.bind(styles);
const baseURL = `${consts.API_BASE}${consts.API.TX}`;
export default function(props) {
	const txHash = props.match.params?.tx;
	const [data, refetch, setUrl] = useFetch(txHash === "test" ? "" : `${baseURL}/${txHash}`);
	// script that will query data when data is here
	if (data?.data?.height === 0) {
		return <NotFound />;
	}
	return (
		<div className={cx("Tx")}>
			<TitleWrapper>
				<PageTitle title={"Transaction details"} />
			</TitleWrapper>
			{empty(data.data) && txHash !== "test" ? (
				undefined
			) : (
				<>
					<TxInfo txData={txHash === "test" ? MockData : data.data} />
					<TxData txData={txHash === "test" ? MockData : data.data} />
				</>
			)}
		</div>
	);
}
