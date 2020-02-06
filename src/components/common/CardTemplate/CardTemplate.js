import React from "react";
import styles from "./CardTemplate.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CardTemplate = props => <div className={cx("card-template")}>{props.children}</div>;

export default CardTemplate;
