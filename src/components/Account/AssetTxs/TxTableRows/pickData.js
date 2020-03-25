import React from "react";
import txTypes from "src/constants/txTypes";
import {_} from "src/lib/scripts";
import getTxType from "src/constants/getTxType";
import Skeleton from "react-skeleton-loader";

const {DEX, COSMOS} = txTypes;
export default function(data, cx, cell) {
	switch (cell) {
		case "txType": {
			if (!_.isNil(data?.txType)) return <span className={cx("type")}>{getTxType(data?.txType)}</span>;
			return <Skeleton />;
		}
		case "address": {
		}
		default:
			return "DEFAULT";
	}
}
