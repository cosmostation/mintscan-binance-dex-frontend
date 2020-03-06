import React from "react";
import cn from "classnames/bind";
import styles from "./IndexedPagination.scss";
import {getPercentage} from "src/lib/scripts";

const cx = cn.bind(styles);

// TODO
//  memoize this in the future
export const footerRender = (state, realTime, realTimeButtonClick, formattedMaxHeight, onePageClick, baseProperty, indexDisplayDecimals, jumpToEnd) => {
	// console.log(state.maxIndex, state.isFront, state.pageData?.[0]?.[baseProperty]);
	const jumpFront = () => {
		if (state.isFront) return;
		console.log("jump");
		jumpToEnd(false);
	};
	// console.log("footer", state);
	return (
		<div className={cx("table-footer")}>
			<div className={cx("paginationWrapper")}>
				<div className={cx("realtime", {inactive: !state.isFront || state.maxIndex !== state.pageData?.[0]?.[baseProperty]})}>
					<button onClick={realTimeButtonClick} className={cx("checkBox")}>
						<img alt={"checkbox"} className={cx({clicked: realTime})} />
					</button>
					<div className={cx("text")}>Real Time</div>
				</div>
				<div className={cx("heightWrapper")}>
					<p>
						<span>index </span>
						{state.maxIndex ? getPercentage(state.pageData[0]?.[baseProperty], state.maxIndex, indexDisplayDecimals) : ""}%<span> of </span>
						{state.maxIndex ? formattedMaxHeight : ""}
					</p>
				</div>
				<div className={cx("buttonsWrapper")}>
					<img
						alt={"first"}
						className={cx("last", "flip", {inactive: state.isFront && state.maxIndex === state.pageData?.[0]?.[baseProperty]})}
						onClick={jumpFront}
					/>
					<img
						alt={"left"}
						className={cx("right", "flip", {inactive: state.isFront && state.maxIndex === state.pageData?.[0]?.[baseProperty]})}
						onClick={() => onePageClick(true)}
					/>
					<img alt={"right"} className={cx("right", {inactive: state.index[1] + state.pageSize > state.maxIndex})} onClick={() => onePageClick(false)} />
					<img alt={"last"} className={cx("last")} onClick={() => null} />
				</div>
			</div>
		</div>
	);
};
