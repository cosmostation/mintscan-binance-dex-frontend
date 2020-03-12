// TODO : use this if prod server is ready
import config from "src/config";
const api = process.env.NODE_ENV === "production" ? config.API_PROD : config.API_DEV;

export default Object.freeze({
	API_BASE: api,
	NUM: {
		BASE_MULT: 100000000,
		REAL_TIME_DELAY_MS: 2000,
		DASH_REAL_TIME_DELAY_MS: 3000,
	},
	API: {
		STATUS: "/status",
		BLOCKLIST: "/blocks",
		TXLIST: "/txs",
		TX: "/txs",
		ASSETS: "/assets?page=1&rows=1000",
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
