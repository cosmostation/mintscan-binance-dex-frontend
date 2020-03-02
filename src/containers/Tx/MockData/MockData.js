import txTypes from "src/constants/txTypes";
import moment from "moment";

const now = new moment();

export default Object.freeze([
	{
		height: 69763802,
		result: true,
		tx_hash: "A60189E7F5265E67D317E8A5D464F044FA97B30330009DE336E98F4A1649229D",
		messages: [
			{
				type: "dex/NewOrder",
				value: {
					id: "88E78538A4AC1EA4BAECBD46769B576B80C6DC29-198732",
					side: 1,
					price: "523426",
					sender: "tbnb13rnc2w9y4s02fwhvh4r8dx6hdwqvdhpfg0w35w",
					symbol: "AVA-645_BNB",
					quantity: "39600000000",
					ordertype: 2,
					timeinforce: 1,
				},
			},
		],
		signatures: [
			{
				pubkey: "bcap1addwnpepqgzm63m6yf3vvjkfhzu0cdjfgqrdf9yyncmet7qq5z5n84fweuulc5tlgd4",
				address: "88E78538A4AC1EA4BAECBD46769B576B80C6DC29",
				sequence: "198731",
				signature: "cIFbID6gBlwuELG6s/Xfq1ltiCSTd8nEbXqxtg1gSLQWmPYYWzJswEpG/x3PekRZG0BHAm9X8SpD7IxiIFTgXA==",
				account_number: "317186",
			},
		],
		memo: "",
		code: 0,
		timestamp: "2020-02-21T17:45:33.411912Z",
	},
]);
