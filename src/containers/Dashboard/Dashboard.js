import React from "react";
import cn from "classnames/bind";
import styles from "./Dashboard.scss";

//  components
import SearchArea from "src/components/Dashboard/SearchArea";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("Dashboard")}>
			<SearchArea />
		</div>
	);
}
