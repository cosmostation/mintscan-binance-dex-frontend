import txTypes from "src/constants/txTypes";
import {_} from "src/lib/scripts";

const SVG = Object.freeze(_.times(7, v => process.env.PUBLIC_URL + `/assets/transactions/msgsic_${v + 1}.svg`));

const {COSMOS, DEX, TOKENS, MISC} = txTypes;
export default function(type) {
	if (_.findIndex([TOKENS.ISSUE, TOKENS.MINT, TOKENS.BURN, DEX.LIST], v => type === v)) return SVG[0];
	else if (_.findIndex([COSMOS.SEND, DEX.ORDER_NEW, DEX.ORDER_CANCEL], v => type === v)) return SVG[1];
	else if (_.findIndex([COSMOS.PROPOSAL_SUBMIT, COSMOS.DEPOSIT, COSMOS.VOTE], v => type === v)) return SVG[2];
	else if (_.findIndex([TOKENS.TIME_LOCK, TOKENS.TIME_RELOCK, TOKENS.TIME_UNLOCK], v => type === v)) return SVG[3];
	else if (_.findIndex([TOKENS.FREEZE, TOKENS.UNFREEZE], v => type === v)) return SVG[4];
	else if (_.findIndex([TOKENS.HTLT_DEPOSIT, TOKENS.HTLT_CLAIM, TOKENS.HTLT_REFUND], v => type === v)) return SVG[5];
	else if (MISC.ACCOUNTFLAG_SET === type) return SVG[6];
	return process.env.PUBLIC_URL + "/assets/icons/common/binance_token.svg";
}
