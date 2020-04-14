import React from "react";
import styles from "./SvgDisplay.scss";
import cn from "classnames/bind";
//  assets
import defaultSVG from "src/assets/common/arrow_ic.svg";

const cx = cn.bind(styles);
export default function SvgDisplay({svgSrc = defaultSVG, customClass}) {
	return (
		<div className={cx("Svg-wrapper", customClass ? customClass : undefined)}>
			<img src={svgSrc} alt='SVG' />
		</div>
	);
}
