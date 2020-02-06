import React from "react";
import styles from "./CardTemplate.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CardTemplate = ({children}) => <div className={cx("card-template")}>{children}</div>;

export default CardTemplate;
