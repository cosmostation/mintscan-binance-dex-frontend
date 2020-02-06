import React from "react";
import cn from "classnames/bind";
import styles from "./BlockList.scss";

//  components
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import CardTemplate from "src/components/common/CardTemplate";
import Table from "src/components/BlockList/Table";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("BlockList")}>
			<TitleWrapper>
				<PageTitle title={"Blocks"} />
			</TitleWrapper>
			<CardTemplate>
				<Table />
			</CardTemplate>
		</div>
	);
}
