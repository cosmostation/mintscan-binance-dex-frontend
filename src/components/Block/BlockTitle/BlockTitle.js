import React from "react";
import styles from "./BlockTitle.scss";
import classNames from "classnames/bind";
//  assets
import RightArrowSVG from "src/assets/common/arrow_ic.svg";

const cx = classNames.bind(styles);

const BlockTitle = ({height, onClick, loading}) => {
	const handleClick = isPrev => () => {
		if (loading) return;
		onClick(isPrev);
	};
	return (
		<div className={cx("block-title-wrapper")}>
			<h2 className={cx("title")}>
				Details for Block <span style={{fontSize: "22px"}}>#{height}</span>
			</h2>
			<ul className={cx("icons")}>
				<li onClick={handleClick(true)}>
					<img className={cx("flip")} src={RightArrowSVG} alt='arrow' />
				</li>
				<li onClick={handleClick(false)}>
					<img src={RightArrowSVG} alt='arrow' />
				</li>
			</ul>
		</div>
	);
};

export default BlockTitle;
