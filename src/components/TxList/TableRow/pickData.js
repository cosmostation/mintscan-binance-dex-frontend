import React from "react";
import {_} from "src/lib/scripts";
import {NavLink} from "react-router-dom";

import Skeleton from "react-skeleton-loader";
import {reduceString, setAgoTime} from "src/lib/scripts";
import {cxTableRow} from "./TableRow";

export const CELL_TYPES = Object.freeze(["Tx Hash", "Type", "From", "To", "Value", "Height", "Time"]);

//  Define this and fill 'em up
const MESSAGE_TYPES = {
	COSMOS_SDK_SEND: "cosmos-sdk/Send",
};

export default function(blockData, cell) {
	switch (cell) {
		case CELL_TYPES[0]:
			if (!_.isNil(blockData.tx_hash))
				return (
					<NavLink className={cxTableRow("blueColor")} to={`/txs/${blockData.height}`}>
						{reduceString(blockData.tx_hash, 9, 5)}
					</NavLink>
				);
			return <Skeleton />;
		case CELL_TYPES[1]:
			if (!_.isNil(blockData?.messages?.[0]?.type)) return <span>{blockData?.messages?.[0]?.type}</span>;
			return <Skeleton />;
		case CELL_TYPES[2]:
			// TODO
			//  pretty much divide all the cases
			if (!_.isNil(blockData?.messages?.[0]?.value?.sender)) return <span>{reduceString(blockData?.messages?.[0]?.value?.sender, 12, 8)}</span>;
			if (blockData?.messages?.[0]?.type === MESSAGE_TYPES.COSMOS_SDK_SEND)
				return <span>{reduceString(blockData?.messages?.[0]?.value?.inputs?.[0]?.address, 12, 8)}</span>;
			return <Skeleton />;
		case CELL_TYPES[3]:
			// TODO
			//  pretty much divide all the cases
			if (blockData?.messages?.[0]?.type !== MESSAGE_TYPES.COSMOS_SDK_SEND) return <span>-</span>;
			return <span>{reduceString(blockData?.messages?.[0]?.value?.outputs?.[0]?.address, 12, 8)}</span>;
		case CELL_TYPES[4]:
	}
}
