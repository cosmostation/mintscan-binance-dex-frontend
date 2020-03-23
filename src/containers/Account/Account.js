import React from "react";
import cn from "classnames/bind";
import style from "./Account.scss";
//  components
import PageTitle from "src/components/common/PageTitle";
import TitleWrapper from "src/components/common/TitleWrapper";

import Address from "src/components/Account/Address";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import {empty} from "src/lib/scripts";
import NotFound from "src/components/common/NotFound";

const cx = cn.bind(style);

const baseURL = `${consts.API_BASE}${consts.API.ACCOUNT}/`;
export default function Account(props) {
	const {history} = props;
	const account = props.match.params.account;
	const [state, , setUrl] = useFetch(`${baseURL}${account}`);

	React.useEffect(() => {
		console.log("action", history.action);
		if (history.action === "PUSH" || (history.action === "POP" && !empty(state.data) && state.data.address !== account)) {
			console.log("entered url hit");
			setUrl(`${baseURL}${account}`);
		}
	}, [account, history.action, setUrl, state.data]);

	if ((!state.loading && (state?.data?.address === "" || state?.data?.error_code)) || account === "notFound") return <NotFound />;

	return (
		<div className={cx("Account-wrapper")}>
			<TitleWrapper>
				<PageTitle title={"Account Details"} />
			</TitleWrapper>
			<Address />
			Work here - {account}
		</div>
	);
}
