import * as React from "react";
import cn from "classnames/bind";
import style from "./Account.scss";

//  components
import PageTitle from "src/components/common/PageTitle";
import TitleWrapper from "src/components/common/TitleWrapper";

import Address from "src/components/Account/Address";

const cx = cn.bind(style);

export default function Account(props) {;
	return (
		<div className={cx("Account-wrapper")}>
			<TitleWrapper>
				<PageTitle title={"Account Details"} />
			</TitleWrapper>
			<Address />
			Work here - {props.match.params.account}
		</div>
	);
}
