const dashboard = process.env.PUBLIC_URL + "/assets/icons/navigation/dashboard_ic_none.svg";
const dashboardOn = process.env.PUBLIC_URL + "/assets/icons/navigation/dashboard_ic.svg";
const blocks = process.env.PUBLIC_URL + "/assets/icons/navigation/blocks_ic_none.svg";
const blocksOn = process.env.PUBLIC_URL + "/assets/icons/navigation/blocks_ic.svg";
const txs = process.env.PUBLIC_URL + "/assets/icons/navigation/transations_ic_none.svg";
const txsOn = process.env.PUBLIC_URL + "/assets/icons/navigation/transations_ic.svg";
const assets = process.env.PUBLIC_URL + "/assets/icons/navigation/assets_ic_none.svg";
const assetsOn = process.env.PUBLIC_URL + "/assets/icons/navigation/assets_ic.svg";
const dex = process.env.PUBLIC_URL + "/assets/icons/navigation/dex_ic_none.svg";
const dexOn = process.env.PUBLIC_URL + "/assets/icons/navigation/dex_ic.svg";

export default {
	on: [dashboardOn, blocksOn, txsOn, assetsOn, dexOn],
	off: [dashboard, blocks, txs, assets, dex],
};
