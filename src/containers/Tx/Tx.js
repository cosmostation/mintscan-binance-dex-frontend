import * as React from "react";
import cn from "classnames/bind";
import styles from "./Tx.scss";

import {_, empty} from "src/lib/scripts";
import consts from "src/constants/consts";
import {useFetch, usePrevious, useHistory} from "src/hooks";
import MockData from "src/containers/Tx/MockData";
//  components
import TitleWrapper from "src/components/common/TitleWrapper";
import TxInfo from "src/components/Tx/TxInfo";
import TxData from "src/components/Tx/TxData";
import PageTitle from "src/components/common/PageTitle";
import NotFound from "src/components/common/NotFound";

const cx = cn.bind(styles);
export default function(props) {
	const txHash = props.match.params?.tx;
	const prevTxHash = usePrevious(txHash);
	const isOrderId = !isNaN(_.toNumber(txHash.split("-")[1]));

	// TODO
	//  ask api to be changed to return corresponding tx instead
	const [state, , setUrl] = useFetch(txHash === "test" ? "" : `${consts.API_BASE}${isOrderId ? consts.API.ORDERS : consts.API.TX}/${txHash}`);
	// script that will query data when data is here

	React.useEffect(() => {
		//  query by order id
		if (state.data?.transactionHash) setUrl(`${consts.API_BASE}${consts.API.TX}/${state.data.transactionHash}`);
	}, [txHash, setUrl, isOrderId, state.data]);

	//  txHash has changed
	React.useEffect(() => {
		if (txHash !== prevTxHash && !_.isNil(txHash) && !_.isNil(prevTxHash)) {
			setUrl(`${consts.API_BASE}${isOrderId ? consts.API.ORDERS : consts.API.TX}/${txHash}`);
		}
	}, [txHash, prevTxHash, setUrl, isOrderId]);

	if (state?.data?.height === 0 || (!_.isNil(state?.data) && _.isNil(state?.data?.height))) {
		return <NotFound altText={"Sorry! Tx Not Found"} />;
	}

	return (
		<div className={cx("Tx-wrapper")}>
			<TitleWrapper>
				<PageTitle title={"Transaction details"} />
			</TitleWrapper>
			{empty(state.data) && txHash !== "test" ? (
				undefined
			) : (
				<>
					<TxInfo txData={txHash === "test" ? MockData : state.data} />
					<TxData txData={txHash === "test" ? MockData : state.data} />
				</>
			)}
		</div>
	);
}
