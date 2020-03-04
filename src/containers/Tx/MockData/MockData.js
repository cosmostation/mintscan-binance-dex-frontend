import txTypes from "src/constants/txTypes";
import moment from "moment";

const now = new moment();

export default Object.freeze({
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
});

//  examples

const send = {
	height: 71599292,
	result: true,
	tx_hash: "21DF1CAC45FB73A8D92F54BFAAD82E56954D4EF72CCF1FD3DE41AD97F202A618",
	messages: [
		{
			type: "cosmos-sdk/Send",
			value: {
				inputs: [
					{
						coins: [
							{
								denom: "ETH-1C9",
								amount: "3616590",
							},
						],
						address: "bnb1xevgryuhzqxeny62a85ummgql99cmxjcvkjrg3",
					},
				],
				outputs: [
					{
						coins: [
							{
								denom: "ETH-1C9",
								amount: "3616590",
							},
						],
						address: "bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23",
					},
				],
			},
		},
	],
	signatures: [
		{
			pubkey: "bcap1addwnpepqf7me4ruga3kte7mgnamsjsx82tu8h4j9ve0j2a4mtqzsmjrfmwg6kvyq0t",
			address: "3658819397100D99934AE9E9CDED00F94B8D9A58",
			sequence: "6",
			signature: "f3yic6FmKI916kPddZVtajMZscIRgKRWx7FkDB+p1DcP8QHz/eEzTiTgJpEIgoH8ojvPfSETCEYk6DjdKrI6sw==",
			account_number: "368470",
		},
	],
	memo: "101591130",
	code: 0,
	timestamp: "2020-03-01T07:33:50.756861Z",
};

const cancelOrder = {
	height: 71614924,
	result: true,
	tx_hash: "863DA43DE67C6A43491EE0CFFFA6303051D602BA820F20C074206D2CDBC3D0F0",
	messages: [
		{
			type: "dex/CancelOrder",
			value: {
				refid: "5B5B02A7AD42FCF2FE8312587A9B0B5012A205AC-105050",
				sender: "bnb1tdds9fadgt709l5rzfv84xct2qf2ypdvmzgepv",
				symbol: "PYN-C37_BNB",
			},
		},
	],
	signatures: [
		{
			pubkey: "bcap1addwnpepq2zr6xm4tn9tsva09lgsrqlnz5wp553c785l89d7tad026mz3q597nsmax6",
			address: "5B5B02A7AD42FCF2FE8312587A9B0B5012A205AC",
			sequence: "105080",
			signature: "ZPj26IGVwmYu9uOrPc1ADuI6sb2Qbp4G/unQZtPBzuQKnMfnl/Fxi4mtPhk54WqDE0DHNkPUwnQ3P+g3853Ffg==",
			account_number: "302681",
		},
	],
	memo: "",
	code: 0,
	timestamp: "2020-03-01T09:17:59.806443Z",
};
