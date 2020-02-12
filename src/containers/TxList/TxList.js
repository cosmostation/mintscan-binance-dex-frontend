import React from "react";
import cn from "classnames/bind";
import styles from "./TxList.scss";
//  components
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("TxList")}>
			<TitleWrapper>
				<PageTitle title={"Transactions"} />
			</TitleWrapper>
		</div>
	);
}
