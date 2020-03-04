import * as React from "react";

import {_} from "src/lib/scripts";
import {txCheckSend, txCheckOrder} from "../TxCase";
import {NavLink} from "react-router-dom";

export default function({type, txData, value, cx}) {
	let from = null;
	if (txCheckSend(type)) from = value?.outputs?.[0]?.address;
	else if (txCheckOrder(type)) from = value.sender;
	if (_.isString(from))
		return (
			<NavLink className={cx("blueColor")} to={`/accounts/${from}`}>
				{from}
			</NavLink>
		);
	return <>-</>;
}
