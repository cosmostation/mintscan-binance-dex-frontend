import txTypes from "src/constants/txTypes";

const {COSMOS, DEX, TOKENS, MISC} = txTypes;

export default function(txType) {
	switch (txType) {
		case DEX.ORDER_NEW:
		case "NEW_ORDER":
			return "Place Order";

		case "CANCEL_ORDER":
		case DEX.ORDER_CANCEL:
			return "Cancel Order";

		case "TRANSFER":
		case COSMOS.SEND:
			return "Transfer";

		case "LIST_TOKEN":
		case DEX.LIST:
			return "Listing";
		case "FREEZE_TOKEN":
		case TOKENS.FREEZE:
			return "Freeze";

		case "UN_FREEZE_TOKEN":
		case TOKENS.UNFREEZE:
			return "Unfreeze";

		case "TIME_LOCK":
		case TOKENS.TIME_LOCK:
			return "Time Lock";

		case "TIME_UNLOCK":
		case TOKENS.TIME_UNLOCK:
			return "Time Unlock";
		case TOKENS.TIME_RELOCK:
			return "Time Relock";

		case "ISSUE_TOKEN":
		case TOKENS.ISSUE:
			return "Issue Asset";

		case "BURN_TOKEN":
		case TOKENS.BURN:
			return "Burn";

		case TOKENS.MINT:
			return "Mint";
		case TOKENS.HTLT:
			return "Create Swap";
		case TOKENS.HTLT_CLAIM:
			return "Claim Swap";
		case TOKENS.HTLT_DEPOSIT:
			return "Deposit Swap";
		case TOKENS.HTLT_REFUND:
			return "Refund Swap";

		case COSMOS.DEPOSIT:
			return "Deposit";
		case "PROPOSAL":
		case COSMOS.PROPOSAL_SUBMIT:
			return "Proposal Submit";
		case COSMOS.VALIDATOR_PROPOSAL:
			return "Validator Proposal";
		case "VOTE":
		case COSMOS.VOTE:
			return "Vote";
		case COSMOS.VALIDATOR_CREATE:
			return "Validator Create";
		case COSMOS.VALIDATOR_REMOVE:
			return "Validator Remove";

		case MISC.ACCOUNTFLAG_SET:
			return "Set Account Flag";
		default:
			return txType;
	}
}
