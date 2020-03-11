export default Object.freeze({
	height: 71997801,
	result: true,
	tx_hash: "7577467833A9FAB21DCDE99177A8F397E820F65DEAA0A3EBC66B10717FA588F0",
	messages: [
		{
			type: "cosmos-sdk/MsgSubmitProposal",
			value: {
				title: "list XRPBEAR-00B/BNB",
				proposer: "bnb1ff4r0t7j8ll8lf3gm2ltdu3hjy4w690j7vvees",
				description:
					'{"base_asset_symbol":"XRPBEAR-00B","quote_asset_symbol":"BNB","init_price":3700000000,"description":"list XRPBEAR-00B/BNB","expire_time":"2020-03-17T19:49:51-07:00"}',
				proposal_type: "ListTradingPair",
				voting_period: "86400000000000",
				initial_deposit: [
					{
						denom: "BNB",
						amount: "100000000000",
					},
				],
			},
		},
	],
	signatures: [
		{
			pubkey: "bcap1addwnpepq2jfeyf02pxsum6c65226ktp5lptvutqw98hx5unfqmfed90hlp9wwvcazk",
			address: "4A6A37AFD23FFE7FA628DABEB6F237912AED15F2",
			sequence: "64",
			signature: "DELNhR11lgb1ifaPWxArGBUNmx1nyvXwXQdJiYHKWXAaU5jW6xQ7oLof7J4HblxrzZbWQsMtgfSoPjqA2fLojQ==",
			account_number: "341626",
		},
	],
	memo: "",
	code: 0,
	timestamp: "2020-03-03T04:26:29.948035Z",
});

//  examples

// const send = {
// 	height: 71599292,
// 	result: true,
// 	tx_hash: "21DF1CAC45FB73A8D92F54BFAAD82E56954D4EF72CCF1FD3DE41AD97F202A618",
// 	messages: [
// 		{
// 			type: "cosmos-sdk/Send",
// 			value: {
// 				inputs: [
// 					{
// 						coins: [
// 							{
// 								denom: "ETH-1C9",
// 								amount: "3616590",
// 							},
// 						],
// 						address: "bnb1xevgryuhzqxeny62a85ummgql99cmxjcvkjrg3",
// 					},
// 				],
// 				outputs: [
// 					{
// 						coins: [
// 							{
// 								denom: "ETH-1C9",
// 								amount: "3616590",
// 							},
// 						],
// 						address: "bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23",
// 					},
// 				],
// 			},
// 		},
// 	],
// 	signatures: [
// 		{
// 			pubkey: "bcap1addwnpepqf7me4ruga3kte7mgnamsjsx82tu8h4j9ve0j2a4mtqzsmjrfmwg6kvyq0t",
// 			address: "3658819397100D99934AE9E9CDED00F94B8D9A58",
// 			sequence: "6",
// 			signature: "f3yic6FmKI916kPddZVtajMZscIRgKRWx7FkDB+p1DcP8QHz/eEzTiTgJpEIgoH8ojvPfSETCEYk6DjdKrI6sw==",
// 			account_number: "368470",
// 		},
// 	],
// 	memo: "101591130",
// 	code: 0,
// 	timestamp: "2020-03-01T07:33:50.756861Z",
// };
//
// const cancelOrder = {
// 	height: 71614924,
// 	result: true,
// 	tx_hash: "863DA43DE67C6A43491EE0CFFFA6303051D602BA820F20C074206D2CDBC3D0F0",
// 	messages: [
// 		{
// 			type: "dex/CancelOrder",
// 			value: {
// 				refid: "5B5B02A7AD42FCF2FE8312587A9B0B5012A205AC-105050",
// 				sender: "bnb1tdds9fadgt709l5rzfv84xct2qf2ypdvmzgepv",
// 				symbol: "PYN-C37_BNB",
// 			},
// 		},
// 	],
// 	signatures: [
// 		{
// 			pubkey: "bcap1addwnpepq2zr6xm4tn9tsva09lgsrqlnz5wp553c785l89d7tad026mz3q597nsmax6",
// 			address: "5B5B02A7AD42FCF2FE8312587A9B0B5012A205AC",
// 			sequence: "105080",
// 			signature: "ZPj26IGVwmYu9uOrPc1ADuI6sb2Qbp4G/unQZtPBzuQKnMfnl/Fxi4mtPhk54WqDE0DHNkPUwnQ3P+g3853Ffg==",
// 			account_number: "302681",
// 		},
// 	],
// 	memo: "",
// 	code: 0,
// 	timestamp: "2020-03-01T09:17:59.806443Z",
// };
