import React from "react";
import cn from "classnames/bind";
import style from "./Account.scss";
import consts from "src/constants/consts";
import {empty, _} from "src/lib/scripts";

//  components
import AssetTxs from "src/components/Account/AssetTxs";
import PageTitle from "src/components/common/PageTitle";
import TitleWrapper from "src/components/common/TitleWrapper";
import Address from "src/components/Account/Address";
import NotFound from "src/components/common/NotFound";

//  hooks
import {useFetch, useGetPrices} from "src/hooks";

const cx = cn.bind(style);

const baseURL = `${consts.API_BASE}${consts.API.ACCOUNT}/`;
export default function Account(props) {
	const {history} = props;
	const account = props.match.params.account;

	const [state, refetch, setUrl] = useFetch(`${baseURL}${account}`);
	const [prices, setTargetAssets] = useGetPrices(consts.NUM.ASSET_REFETCH_PRICE_INTERVAL_MS);

	// TODO
	//  attempt at keeping account data up-to-date
	//  fix this to work in the future
	// React.useEffect(() => {
	// 	if (!account) return;
	// 	const interval = setInterval(() => {
	// 		console.log(`refetch - ${account}`);
	// 		refetch();
	// 	}, consts.NUM.ACCOUNT_REFETCH_INTERVAL_MS);
	// 	return () => clearInterval(interval);
	// }, [account, refetch]);

	React.useEffect(() => {
		if (history.action === "PUSH" || (history.action === "POP" && !empty(state.data) && state.data.address !== account)) {
			setUrl(`${baseURL}${account}`);
		}
	}, [account, history.action, refetch, setUrl, state.data]);

	//  when data from address arrives, set the useGetPrice hook to start
	React.useEffect(() => {
		if (empty(state.data?.balances)) return;
		setTargetAssets(_.map(state.data.balances, v => v.symbol));
	}, [state.data, setTargetAssets]);

	const assetTxs = React.useMemo(() => <AssetTxs prices={prices} address={account} balances={state.data?.balances ? state.data?.balances : []} />, [
		prices,
		account,
		state.data,
	]);

	const displayAddress = React.useMemo(() => <Address account={state.data ? state.data : {}} prices={prices} />, [state.data, prices]);

	const render = React.useMemo(
		() => (
			<div className={cx("Account-wrapper")}>
				<TitleWrapper>
					<PageTitle title={"Account Details"} />
				</TitleWrapper>
				{displayAddress}
				{assetTxs}
			</div>
		),
		[displayAddress, assetTxs]
	);

	if ((!state.loading && (state?.data?.address === "" || state?.data?.error_code)) || account === "notFound") return <NotFound />;

	return render;
}

// const exAccount = {
// 	address: "bnb100dxzy02a6k7vysc5g4kk4fqamr7jhjg4m83l0",
// 	publicKey: ["1", "2"],
// 	account_number: 96025,
// 	sequence: 247,
// 	flags: 0,
// 	balances: [
// 		{
// 			symbol: "BNB",
// 			free: "0.64787500",
// 			locked: "0.00000000",
// 			frozen: "0.00000000",
// 		},
// 		{
// 			symbol: "ETH-1C9",
// 			free: "21.58894766",
// 			locked: "0.00000000",
// 			frozen: "0.00000000",
// 		},
// 		{
// 			symbol: "SLV-986",
// 			free: "1.00000000",
// 			locked: "0.00000000",
// 			frozen: "0.00000000",
// 		},
// 		{
// 			symbol: "TAUDB-888",
// 			free: "500000.00000000",
// 			locked: "0.00000000",
// 			frozen: "240000.00000000",
// 		},
// 		{
// 			symbol: "TCADB-888",
// 			free: "500000.00000000",
// 			locked: "0.00000000",
// 			frozen: "160000.00000000",
// 		},
// 		{
// 			symbol: "TGBPB-888",
// 			free: "200000.00000000",
// 			locked: "0.00000000",
// 			frozen: "615000.00000000",
// 		},
// 		{
// 			symbol: "THKDB-888",
// 			free: "1000000.00000000",
// 			locked: "0.00000000",
// 			frozen: "3000000.00000000",
// 		},
// 		{
// 			symbol: "TUSDB-888",
// 			free: "10000000.00000000",
// 			locked: "0.00000000",
// 			frozen: "49938304.35402596",
// 		},
// 	],
// };
