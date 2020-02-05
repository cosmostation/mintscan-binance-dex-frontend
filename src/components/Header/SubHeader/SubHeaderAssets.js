import dashboard from "src/assets/icons/navigation/dashboard_ic_none.svg";
import dashboardOn from "src/assets/icons/navigation/dashboard_ic.svg";
import blocks from "src/assets/icons/navigation/blocks_ic_none.svg";
import blocksOn from "src/assets/icons/navigation/blocks_ic.svg";
import txs from "src/assets/icons/navigation/transations_ic_none.svg";
import txsOn from "src/assets/icons/navigation/transations_ic.svg";
import assets from "src/assets/icons/navigation/assets_ic_none.svg";
import assetsOn from "src/assets/icons/navigation/assets_ic.svg";
import dex from "src/assets/icons/navigation/binance_ic_none.svg";
import dexOn from "src/assets/icons/navigation/binance_ic.svg";

export default {
	on: [dashboardOn, blocksOn, txsOn, assetsOn, dexOn],
	off: [dashboard, blocks, txs, assets, dex],
};
