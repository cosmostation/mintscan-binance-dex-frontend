// TODO : use this if prod server is ready
// const api = process.env.NODE_ENV === "production" ? "https://lcd-binance-mainnet.cosmostation.io" : "https://api-binance-testnet.cosmostation.io/v1";
const api = "https://api-binance-testnet.cosmostation.io/v1";

export default Object.freeze({
	API_BASE: api,
	NUM: {
		BASE_MULT: 100000000,
	},
	BINANCE_API_BASE: " https://explorer.binance.org/api/v1/",
	BINANCE_API: {
		ASSETS: "/assets",
		ASSET: "/asset",
		ASSET_HOLDERS: "/asset-holders",
		ASSET_TX: "/txs",
	},
	API: {
		BLOCKLIST: "/blocks",
		TXLIST: "/txs",
		TX: "/txs",
	},
	NETWORK: {
		COSMOS: "cosmos-3",
		IRIS: "irishub",
		KAVA: "kava-2",
		BINANCE: "binance",
	},

	PREFIX: {
		COSMOS: "cosmos",
		IRIS: "iris",
		KAVA: "kava",
	},

	MINTSCAN_URL: {
		COSMOS: "https://www.mintscan.io/",
		KAVA: "https://kava.mintscan.io/",
		IRIS: "https://irishub.mintscan.io/",
	},

	LINK: {
		GOOGLE: "https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion",
		IOS: "https://apple.co/2IAM3Xm",
		WEB: "https://wallet.cosmostation.io",
		COSMOSTATION: "https://www.cosmostation.io/",
		BINANCEDEX: "https://www.binance.org/",
		COINGECKO_BINANCE: "https://www.coingecko.com/en/coins/binance-coin",
	},

	MENU: [
		{
			display: "DASHBOARD",
			route: "/",
			primary: true,
		},
		{
			display: "BLOCKS",
			route: "/blocks",
		},
		{
			display: "TRANSACTIONS",
			route: "/txs",
		},
		{
			display: "ASSETS",
			route: "/assets",
		},
		{
			display: "BINANCE DEX",
			route: "/dex",
		},
	],
});
