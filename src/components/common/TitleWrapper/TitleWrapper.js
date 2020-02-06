import React from "react";
import styles from "./TitleWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TitleWrapper = ({children}) => <div className={cx("title-wrapper")}>{children}</div>;

export default TitleWrapper;
