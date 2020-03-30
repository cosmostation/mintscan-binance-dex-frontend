import React from "react";
import cn from "classnames/bind";
import styles from "./DisplayIcon.scss";

import Img from "src/components/common/Img";

const cx = cn.bind(styles);
export default function DisplayIcon({size = 26, image = "", children}) {
	return React.useMemo(
		() => (
			<div className={cx("DisplayIcon-wrapper")} style={{height: `${size * 1.0769}`}}>
				<div
					className={cx("img-wrapper")}
					style={{
						width: `${size}px`,
						height: `${size}px`,
						minWidth: `${size}px`,
					}}>
					<Img src={image} alt={"ic"} />
				</div>
				{children}
			</div>
		),
		[image, children, size]
	);
}
