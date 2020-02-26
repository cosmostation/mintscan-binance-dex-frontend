import React from "react";
import styles from "./BlockTitle.scss";
import classNames from "classnames/bind";

const RightArrowSVG = process.env.PUBLIC_URL + "/assets/icons/common/arrow_ic.svg";

const cx = classNames.bind(styles);

const BlockTitle = ({height, onClick}) => {
	const handleClick = isPrev => () => onClick(isPrev);
	return (
		<div className={cx("block-title-wrapper")}>
			<h2 className={cx("title")}>Details for Block #{height}</h2>
			<div className={cx("icons")}>
				<a onClick={handleClick(true)}>
					<img className={cx("flip")} src={RightArrowSVG} alt='arrow' />
				</a>
				<a onClick={handleClick(false)}>
					<img src={RightArrowSVG} alt='arrow' />
				</a>
			</div>
		</div>
	);
};

export default BlockTitle;
