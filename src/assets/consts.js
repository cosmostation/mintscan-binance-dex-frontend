export default Object.freeze({
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
	},

	MENU: [
		{
			display: "DASHBOARD",
			route: "/dashboard",
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
