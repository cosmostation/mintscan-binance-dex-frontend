import {_} from "src/lib/scripts";
import txTypes from "src/constants/txTypes";

const {COSMOS, DEX, TOKENS, MISC} = txTypes;
export const txGetSide = Object.freeze([null, "Buy", "Sell"]);
export const txGetTimeInforce = Object.freeze([null, "GTE", null, "IOC"]);
export const txGetOrderType = Object.freeze([null, "ORDER", "LIMIT"]);

export const txCheckOrder = txType => _.find([DEX.ORDER_NEW, DEX.ORDER_CANCEL], v => v === txType) !== undefined;
export const txCheckSend = txType => _.find([COSMOS.SEND], v => v === txType) !== undefined;
