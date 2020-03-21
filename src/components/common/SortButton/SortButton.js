import React from "react";
import cn from "classnames/bind";
import styles from "./SortButton.scss";
//  components

const cx = cn.bind(styles);
const arrowBlackSVG = process.env.PUBLIC_URL + "/assets/assets/arrow_bk.svg";
const arrowGreySVG = process.env.PUBLIC_URL + "/assets/assets/arrow_gr.svg";

export default function SortButton({active = false, asc = false}) {
	return React.useMemo(
		() => (
			<div className={cx("sort-wrapper")}>
				<img src={active && !asc ? arrowBlackSVG : arrowGreySVG} />
				<img src={active && asc ? arrowBlackSVG : arrowGreySVG} className={cx("flip")} />
			</div>
		),
		[active, asc]
	);
}
