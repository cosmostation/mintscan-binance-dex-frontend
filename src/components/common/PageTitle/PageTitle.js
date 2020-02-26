import React, {memo} from "react";
import styles from "./PageTitle.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PageTitle = memo(({title}) => <h2 className={cx("pageTitle")}>{title}</h2>);
PageTitle.defaultProps = {
	title: "",
};

export default PageTitle;
