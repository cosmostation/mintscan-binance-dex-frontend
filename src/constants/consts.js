// TODO : use this if prod server is ready
import config from "src/config";

const api = process.env.NODE_ENV === "production" ? config.API_PROD : config.API_DEV;

export const proposerAddress = Object.freeze({
	Everest: "bnb19hunw9ps8n9tkrp2j64jvheezgqmfc2eyrxd7a",
	Ararat: "bnb15hx3frkdu7vajy2eulu80vl97vehnhyavu927v",
	Carrauntoohil: "bnb1jw9xup8arde2jzarzcs2fv49hh28uad92m4ke0",
	Scafell: "bnb16k0gajcczwgymfkk0zsysjzl0sxyxdfckplxlr",
	Seoraksan: "bnb1xaef2agzycsww32fqyggnk5xgqxs8780vfv2kh",
	Zugspitze: "bnb1jstexazk7zateuwzzwllswu4j3dsllu3dgte4m",
	Kita: "bnb13m056plt2646zse2mwxfft92xawnky4nmncxc3",
	Gahinga: "bnb17kfuzeza2kn46yqx4twxxmlw2jk2ywp5x4gze2",
	Elbrus: "bnb1tpagqqqx36gq09kzw4f5a3a9sk3tq54dpl5ldn",
	Aconcagua: "bnb1y888axmhzz6yjj464syfy68mkhzy9phlv8fzac",
	Fuji: "bnb19klje94mnu53wj7pmrk0zmtpwgr0uz8th0fcvw",
});

export default Object.freeze({
	DEFAULT_ARRAY: [],
	API_BIANCE_DEX: "https://www.binance.org/en/trade",
	API_COINGECKO: {
		BASE: "https://api.coingecko.com/api/v3",
		GET_MARKET_CHART_RANGE: (id = "BNB", from, to) => `/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
	},
	NUM: {
		BASE_MULT: 100000000,
		DEFAULT_DECIMALS: 8,
		PAGE_SIZE: 20,

		SPARE_PAGE_CNT: 2, //  amount of pages to preload in pagination
		BINACE_API_ROWS_LIMIT: 1000, //  max rows binance api allows
		BINANCE_API_PAGES_LIMIT: 100, //  max page binance api allows

		REAL_TIME_DELAY_MS: 2000, //  real-time refetch interval(for indexedPagination)
		DASH_REAL_TIME_DELAY_MS: 3000, //  dashboard refetch interval
		ACCOUNT_REFETCH_INTERVAL_MS: 5000, // TODO : currently not used
		ASSET_REFETCH_INTERVAL_MS: 8000,
		ASSET_REFETCH_PRICE_INTERVAL_MS: 8000,
		BASIC_DATA_FETCH_INTERVAL_MS: 30000,
	},
	ASSET: {
		NAME_SEARCH_PROPERTY: ["asset", "mappedAsset", "name"],
		ORDER_COMPARE: ["mappedAsset", "marketCap", "price", "supply"],
	},
	GET_LOGO_LINK: symbol => `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/${symbol}/logo.png`,
	API_BASE: api,
	API: {
		STATUS: "/status",
		BLOCKLIST: "/blocks",
		ACCOUNT: "/account",
		ACCOUNT_TXS: acc => `/account/txs/${acc}?page=1&rows=20`,
		TXLIST: "/txs",
		TX: "/txs",
		ORDERS: "/orders",
		ASSET_IMAGES: "/assets-images?page=1&rows=1000",
		ASSETS: "/assets?page=1&rows=1000",
		ASSET_PRICES: "/assets?page=1&rows=1000&only_price=true",
		ASSET: "/asset?asset=",
		ASSET_TXS: "/assets/txs?page=1&rows=20&txAsset=",
		ASSET_HOLDERS: "/asset-holders?&page=1&rows=20&asset=",
		TOP_ASSETS: "/market/coin/list",
		CHARTS: "/stats/assets/chart",
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
