import React from "react";
import {_, empty, formatNumber, reduceString} from "src/lib/scripts";
import {NavLink} from "react-router-dom";

import Skeleton from "react-skeleton-loader";

import txTypes from "src/constants/txTypes";
import * as Big from "src/lib/Big";
import getTxType from "src/components/TxList/TableRow/getTxType";

export const CELL_TYPES = Object.freeze(["Tx Hash", "Type", "From", "To", "Value", "Height", "Time"]);

const BASE_MULT = Math.pow(10, 8);

export default function(blockData, cx, cell) {
	switch (cell) {
		case CELL_TYPES[0]:
			if (!_.isNil(blockData.tx_hash))
				return (
					<NavLink className={cx("blueColor")} to={`/txs/${blockData.tx_hash}`}>
						{reduceString(blockData.tx_hash, 6, 6)}
					</NavLink>
				);
			return <Skeleton />;
		case CELL_TYPES[1]:
			if (!_.isNil(blockData?.messages?.[0]?.type)) return <span className={cx("type")}>{getTxType(blockData?.messages?.[0]?.type)}</span>;
			return <Skeleton />;
		case CELL_TYPES[2]: {
			// TODO
			//  pretty much divide all the cases
			let address;
			if (!_.isNil(blockData?.messages?.[0]?.value?.sender)) address = `${blockData?.messages?.[0]?.value?.sender}`;
			else if (blockData?.messages?.[0]?.type === txTypes.COSMOS.SEND) address = `${blockData?.messages?.[0]?.value?.inputs?.[0]?.address}`;

			//  remove the t in front
			if (_.isString(address))
				return (
					<NavLink className={cx("blueColor")} to={`/account/${address.substring(1, address.length - 1)}`}>
						<span>{reduceString(address.substring(1, address.length - 1), 6, 6)}</span>
					</NavLink>
				);
			return <Skeleton />;
		}
		case CELL_TYPES[3]: {
			// TODO
			//  pretty much divide all the cases
			if (blockData?.messages?.[0]?.type !== txTypes.COSMOS.SEND) return <span>-</span>;
			if (blockData?.messages?.[0]?.value?.outputs.length > 1) return <span>Multiple Address</span>;
			const address = `${blockData?.messages?.[0]?.value?.outputs?.[0]?.address}`;
			return (
				<NavLink className={cx("blueColor")} to={`/account/${address.substring(1, address.length - 1)}`}>
					<span>{reduceString(address.substring(1, address.length - 1), 6, 6)}</span>
				</NavLink>
			);
		}
		case CELL_TYPES[4]: {
			let amount;
			if (!_.isNil(blockData?.messages?.[0].type)) {
				const type = blockData?.messages?.[0].type;

				if (type === txTypes.DEX.ORDER_NEW)
					amount = Big.multiply(Big.divide(blockData.messages[0]?.value?.price, BASE_MULT), Big.divide(blockData.messages[0]?.value?.quantity, BASE_MULT));
				else if (type === txTypes.COSMOS.SEND) amount = Big.divide(blockData.messages[0]?.value?.outputs?.[0]?.coins?.[0]?.amount, BASE_MULT);
			}
			if (!_.isNil(amount)) {
				const split = amount.split(".");
				return (
					<>
						<span className={cx("text")}>{formatNumber(split[0])}</span>.<span className={cx("text", "decimal")}>{split[1]}</span>
					</>
				);
			}
			return "-";
		}
		case CELL_TYPES[5]: {
			let ret = "";
			if (!_.isNil(blockData?.messages?.[0].type)) {
				if (blockData?.messages?.[0].type === txTypes.DEX.ORDER_NEW) {
					const symbol = blockData?.messages?.[0]?.value?.symbol;
					if (_.isString(symbol)) ret = symbol.split("_")[1];
				}
			}
			if (!empty(ret)) {
				if (ret === "BNB") return <span className={cx("BNB")}>BNB</span>;
				return <span className={cx("currency")}>{ret}</span>;
			}
			return "-";
		}
	}
}
