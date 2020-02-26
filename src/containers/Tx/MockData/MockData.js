import txTypes from "src/constants/txTypes";
import moment from "moment";

export default Object.freeze([
	{
		id: `test-${txTypes.COSMOS.SEND}`,
		txHash: "12E33D89FBB08C9B9AC0136638F42D887A795546D75264BDC9D33802EF9821E7",
		status: "success",
		height: 62827368,
		time: moment()
			.subtract("second", 54)
			.unix(),
		fee: 0,
		asset: "RAVEN",
		memo: "test memo",
		txType: txTypes.DEX.ORDER_NEW,
		from: "bnb182ytpks6qd24sq58ay3jh0hm93cf6m40qe0s73",
		to: null,
		value: 2.915,
		data: {
			symbol: "RAVEN-F66_BNB",
			amount: 250000,
			side: "Sell",
			orderType: "LIMIT",
			timeInforce: "GTE",
			orderId: "8452761BA0E6E214AF58CA493294263B81AE5A32-852272",
		},
	},
]);
