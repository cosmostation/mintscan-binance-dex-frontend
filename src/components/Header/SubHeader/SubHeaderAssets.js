import dashboard from "src/assets/header/dashboard_ic_none.svg";
import dashboardOn from "src/assets/header/dashboard_ic.svg";
import blocks from "src/assets/header/blocks_ic_none.svg";
import blocksOn from "src/assets/header/blocks_ic.svg";
import txs from "src/assets/header/transations_ic_none.svg";
import txsOn from "src/assets/header/transations_ic.svg";
import assets from "src/assets/header/assets_ic_none.svg";
import assetsOn from "src/assets/header/assets_ic.svg";
import dex from "src/assets/header/dex_ic_none.svg";
import dexOn from "src/assets/header/dex_ic.svg";

export default {
	on: [dashboardOn, blocksOn, txsOn, assetsOn, dexOn],
	off: [dashboard, blocks, txs, assets, dex],
};
