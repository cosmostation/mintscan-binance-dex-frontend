import * as React from "react";
import cn from "classnames/bind";
import styles from "./Tx.scss";

import {_, empty} from "src/lib/scripts";
import consts from "src/constants/consts";
import {useFetch, usePrevious} from "src/hooks";
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
	const [txData, setTxData] = React.useState({});

	const [state, , setUrl] = useFetch(txHash === "test" ? "" : `${consts.API_BASE}${isOrderId ? consts.API.ORDERS : consts.API.TX}/${txHash}`);
	// script that will query data when data is here

	React.useEffect(() => {
		//  data is from order id
		console.log(state.data, txData);
		if (!_.isNil(state.data?.fee) && txData?.fee !== state.data?.fee) {
			console.log("set orderId data");
			const obj = {fee: state.data.fee, status: state.data.status};
			if (state.data.status === "Canceled") _.assign(obj, {origTxhash: state.data.transactionHash});
			setTxData(v => ({...v, ...obj}));
			if (_.isNil(txData?.messages)) setUrl(`${consts.API_BASE}${consts.API.TX}/${state.data.transactionHash}`);
		}
		//  data is from txHash
		else if (!empty(state.data?.messages) && txData.tx_hash !== state.data.tx_hash) {
			console.log("set txData");
			setTxData(v => ({...v, ...state.data}));
			//  data has order id
			if (_.isNil(txData?.fee))
				setUrl(
					`${consts.API_BASE}${consts.API.ORDERS}/${
						state.data.messages[0]?.value?.id ? state.data.messages[0]?.value?.id : state.data.messages[0]?.value?.refid
					}`
				);
		}
	}, [setUrl, state.data, txData, txHash]);

	//  txHash has changed
	React.useEffect(() => {
		if (txHash !== prevTxHash && !_.isNil(txHash) && !_.isNil(prevTxHash)) {
			setUrl(`${consts.API_BASE}${isOrderId ? consts.API.ORDERS : consts.API.TX}/${txHash}`);
		}
	}, [txHash, prevTxHash, setUrl, isOrderId]);
	if (state.data?.height === 0 || (!empty(txData) && _.isNil(state.data?.orderId) && _.isNil(state.data?.tx_hash))) {
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
					<TxInfo txData={txHash === "test" ? MockData : txData} />
					<TxData txData={txHash === "test" ? MockData : txData} />
				</>
			)}
		</div>
	);
}
