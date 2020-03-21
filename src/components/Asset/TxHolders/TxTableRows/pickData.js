import React from "react";
import txTypes from "src/constants/txTypes";

const {DEX, COSMOS} = txTypes;
export default function(asset, cx, cell) {
	switch (cell) {
		case "Value": {
		}
		default:
			return "DEFAULT";
	}
}
