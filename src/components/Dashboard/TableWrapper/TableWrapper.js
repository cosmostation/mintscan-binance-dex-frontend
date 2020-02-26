import React from "react";
import styles from "./TableWrapper.scss";
import classNames from "classnames/bind";

import {NavLink} from "react-router-dom";

// components

const cx = classNames.bind(styles);

export default function(props) {
	return (
		<div className={cx("table-content-wrapper")}>
			<div className={cx("CardTemplate")}>
				<div className={cx("title-wrapper")}>
					<h2 className={cx("title")}>{props.title}</h2>
					<NavLink className={cx("btn")} to={props.type === 1 ? "/blocks?blockHeight=0" : "/txs?txID=0"}>
						Show More
					</NavLink>
				</div>
				{props.children}
			</div>
		</div>
	);
}
