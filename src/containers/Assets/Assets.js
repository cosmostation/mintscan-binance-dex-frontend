import React from "react";
import cn from "classnames/bind";
import styles from "./Assets.scss";

//  components
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("AssetList")}>
			<TitleWrapper>
				<PageTitle title={"Assets"} />
			</TitleWrapper>
		</div>
	);
}
