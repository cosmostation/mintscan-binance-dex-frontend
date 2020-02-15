import React from "react";
import cn from "classnames/bind";
import styles from "./IndexedPagination.scss";
import {getPercentage} from "src/lib/scripts";

const cx = cn.bind(styles);

// TODO
//  memoize this in the future
export const footerRender = (state, realTime, realTimeButtonClick, formattedMaxHeight, toFrontClick, onePageClick, baseProperty, indexDisplayDecimals) => (
	<div className={cx("table-footer")}>
		<div className={cx("paginationWrapper")}>
			<div className={cx("realtime", {inactive: !state.isFront || state.maxIndex !== state.pageData?.[0]?.[baseProperty]})}>
				<button onClick={realTimeButtonClick} className={cx("checkBox", {clicked: realTime})} />
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
					onClick={() => toFrontClick(true)}
				/>
				<img
					alt={"left"}
					className={cx("right", "flip", {inactive: state.isFront && state.maxIndex === state.pageData?.[0]?.[baseProperty]})}
					onClick={() => onePageClick(true)}
				/>
				<img alt={"right"} className={cx("right", {inactive: state.index[1] + state.pageSize > state.maxIndex})} onClick={() => onePageClick(false)} />
				<img alt={"last"} className={cx("last")} onClick={() => toFrontClick(false)} />
			</div>
		</div>
	</div>
);
