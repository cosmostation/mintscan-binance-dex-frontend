import {_} from "src/lib/scripts";
import txTypes from "src/constants/txTypes";

// const {COSMOS, DEX, TOKENS, MISC} = txTypes;
const {COSMOS, DEX, TOKENS} = txTypes;
export const txGetSide = Object.freeze([null, "BUY", "SELL"]);
export const txGetTimeInforce = Object.freeze([null, "GTE", null, "IOC"]);
//  I think it was only limit that is being used
// export const txGetOrderType = Object.freeze([null, "ORDER", "LIMIT"]);

export const txCheckOrder = txType => _.find([DEX.ORDER_NEW, DEX.ORDER_CANCEL], v => v === txType) !== undefined;
export const txCheckSend = txType => _.find([COSMOS.SEND], v => v === txType) !== undefined;
export const txCheckFUBM = txType => _.find([TOKENS.BURN, TOKENS.MINT, TOKENS.FREEZE, TOKENS.UNFREEZE], v => v === txType) !== undefined;
export const txCheckHTLT = txType => _.find([TOKENS.HTLT], v => v === txType) !== undefined;
//  last deposit tx was on 19/10/28 so not searchable anyway
// const burn = {
// 	height: 75405740,
// 	result: true,
// 	tx_hash: "242F80EC6DC785CA89EA7010D891ACCF8E2D50B6162D2692C2EB36D705AF1AEF",
// 	messages: [
// 		{
// 			type: "tokens/BurnMsg",
// 			value: {
// 				from: "tbnb1uyekdn62yur9zuctzqyd9ckasfvqttjztdc4mg",
// 				amount: "762043127818100",
// 				symbol: "KAVA-10C",
// 			},
// 		},
// 	],
// };
// const mint = {
// 	height: 74123683,
// 	result: true,
// 	tx_hash: "8FE7A8D31193E79EBDDCFBC725180550D9B5BA15FB85ACA2EC4A53A1C76D0F1C",
// 	messages: [
// 		{
// 			type: "tokens/MintMsg",
// 			value: {
// 				from: "bnb1ff4r0t7j8ll8lf3gm2ltdu3hjy4w690j7vvees",
// 				amount: "30000000000000",
// 				symbol: "EOSBULL-F0D",
// 			},
// 		},
// 	],
// };
//
// const freeze = {
// 	height: 75738775,
// 	result: true,
// 	tx_hash: "FFE8B82BDDD911C205E586414B919FB1F52CD10EF41D9D0C362E70819CEA019E",
// 	messages: [
// 		{
// 			type: "tokens/FreezeMsg",
// 			value: {
// 				from: "tbnb1c0ehe7tlyurqhvrd3zx8fnafekhxe9m0e7tyu8",
// 				amount: "999000000000",
// 				symbol: "RUNE-B1A",
// 			},
// 		},
// 	],
// };
//
// const unfreeze = {
// 	height: 75737414,
// 	result: true,
// 	tx_hash: "0D62D6E839157CDA266C6DE2233BDF2A3789BD4BBC63D087E3587957F5BE6BF4",
// 	messages: [
// 		{
// 			type: "tokens/UnfreezeMsg",
// 			value: {
// 				from: "tbnb1plhkl3mgkzn70680ttx9vx4q3ej4n94swctpcm",
// 				amount: "29200100000000",
// 				symbol: "RUNE-B1A",
// 			},
// 		},
// 	],
// };
//
// const listing = {
// 	height: 73310488,
// 	result: true,
// 	tx_hash: "9B87C85CDB80E01B359A63B309A161D303E33CECCEF12733512DA81B60CB7646",
// 	messages: [
// 		{
// 			type: "dex/ListMsg",
// 			value: {
// 				from: "bnb1srm577fgsjg363vsqt8td4tat5arzfvkjchqgq",
// 				init_price: "85600",
// 				proposal_id: "255",
// 				base_asset_symbol: "TRXB-2E6",
// 				quote_asset_symbol: "BNB",
// 			},
// 		},
// 	],
// };
//
// const timeLock = {
// 	height: 74190922,
// 	result: true,
// 	tx_hash: "D911D9011829966334569BC9C58E7A1937DCE4DAF05B0D3038954F942BA15E72",
// 	messages: [
// 		{
// 			type: "tokens/TimeLockMsg",
// 			value: {
// 				from: "bnb17p7duer52vyg6ydpgefczld76axjct8wd5fq09",
// 				amount: [
// 					{
// 						denom: "CAS-167",
// 						amount: "8200000000000",
// 					},
// 				],
// 				lock_time: "1609286400",
// 				description: "SMART_VALUE-OCT-DEC-2020",
// 			},
// 		},
// 	],
// };
//
// const timeUnlock = {
// 	height: 73455747,
// 	result: true,
// 	tx_hash: "80F1EDBA02F540866F3B489F9C69C346AB24D303066884576F751CBFE39A2A7C",
// 	messages: [
// 		{
// 			type: "tokens/TimeUnlockMsg",
// 			value: {
// 				from: "bnb100dxzy02a6k7vysc5g4kk4fqamr7jhjg4m83l0",
// 				time_lock_id: "193",
// 			},
// 		},
// 	],
// };
//
// const vote = {
// 	height: 74111485,
// 	result: true,
// 	tx_hash: "0066DD91D7759AB234FF71E2361C5BAD89CE1CF1D2C6B6EA486BB22D75488894",
// 	messages: [
// 		{
// 			type: "cosmos-sdk/MsgVote",
// 			value: {
// 				voter: "bnb1kdx4xkktr35j2mpxncvtsshswj5gq577me7lx4",
// 				option: "Yes",
// 				proposal_id: "266",
// 			},
// 		},
// 	],
// };

// const submitproposal = {
// 	height: 76333106,
// 	result: true,
// 	tx_hash: "8DA8E53F458935C8DDBD0D7B34FD6ED729B34768E16E0F67E0D6BEADF6786376",
// 	messages: [
// 		{
// 			type: "cosmos-sdk/MsgSubmitProposal",
// 			value: {
// 				title: "list AVA-645/BUSD-BD1",
// 				proposer: "tbnb1dm9c7gccgd07td5r69m50u8fg8danfgqz27k6f",
// 				description:
// 					'{"base_asset_symbol":"AVA-645","quote_asset_symbol":"BUSD-BD1","init_price":10000000,"description":"list AVA-645/BUSD-BD1","expire_time":"2020-04-20T14:34:17+07:00"}',
// 				proposal_type: "ListTradingPair",
// 				voting_period: "604800000000000",
// 				initial_deposit: [
// 					{
// 						denom: "BNB",
// 						amount: "100000000000",
// 					},
// 				],
// 			},
// 		},
// 	],
// 	memo: "",
// 	code: 0,
// 	timestamp: "2020-03-23T03:45:48.800476Z",
// };
