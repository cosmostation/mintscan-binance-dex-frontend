import * as React from "react";
import cn from "classnames/bind";
import styles from "./ScrollTop.scss";

//  hooks
import {useScroll} from "src/hooks";

const cx = cn.bind(styles);

const scrollTopSVG = process.env.PUBLIC_URL + "/assets/icons/common/scroll_top.svg";

export default function ScrollTop(props) {
	const atScroll = useScroll(100);
	return React.useMemo(() => (
		<div className={cx("ScrollTop-overlay", {invisible: !atScroll})} onClick={() => window.scroll({top: 0, left: 0})}>
			<img src={scrollTopSVG} alt={"up"} />
		</div>
	), [atScroll]);
}
