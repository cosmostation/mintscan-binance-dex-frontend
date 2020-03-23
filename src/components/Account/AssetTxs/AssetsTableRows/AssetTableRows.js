import React from "react";
import cn from "classnames/bind";
import styles from "./AssetTableRows.scss";

//  components
import {TableCell, TableHead, TableRow} from "@material-ui/core";

const cx = cn.bind(styles);

export const ThinTableRows = asset => {
	return (
		<div>
			asdf
			<div>asdf</div>
		</div>
	);
};

export default function({asset}) {
	console.log(asset);
	return (
		<TableRow className={cx("AssetTableRows-wrapper")} hover={true}>
			ROWWWWWWWWWW
		</TableRow>
	);
}
