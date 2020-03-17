import React from "react";
import styles from "./SvgDisplay.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

const defaultSVG = `${process.env.PUBLIC_URL}/assets/icons/arrow_ic.svg`;
export default function SvgDisplay({svgSrc=defaultSVG, customClass}) {
	return (
		<div className={cx("Svg-wrapper", customClass ? customClass : undefined)}>
			<img src={svgSrc} alt="SVG"/>
		</div>
	)
}