import React, {useCallback, useMemo, useState} from "react";

import {NavLink} from "react-router-dom";
//  components
import SearchArea from "src/components/common/SearchArea";
import {Toolbar} from "@material-ui/core";
import _ from "lodash";
import akash from "src/assets/header/token_akash.svg";
import band from "src/assets/header/token_band.svg";
import binance from "src/assets/header/chain_ic.svg";
import certik from "src/assets/header/token_certik.svg";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import cosmos from "src/assets/header/atom_token.svg";
import cryptoOrg from "src/assets/header/token_crypto_org.svg";
import dropdownArrow from "src/assets/common/dropdown_arrow.svg";
import emoney from "src/assets/header/token_emoney.svg";
import fetchAi from "src/assets/header/token_fetchai.svg";
import iris from "src/assets/header/iris_token.svg";
import kava from "src/assets/header/kava_token.svg";
import kichain from "src/assets/header/token_ki_chain.svg";
import logo from "src/assets/header/mintscan_logo.svg";
import osmosis from "src/assets/header/token_osmosis.svg";
import persistence from "src/assets/header/token_persistence.svg";
import sentinel from "src/assets/header/token_sentinel.svg";
import sifchain from "src/assets/header/token_sifchain.svg";
import starname from "src/assets/header/token_starname.svg";
import styles from "./SearchAppBar.scss";
import {useHistory} from "src/hooks";

const cx = cn.bind(styles);

const avaliableNetworks = [
	"cosmos",
	"kava",
	"iris",
	"starname",
	"band",
	"akash",
	"sentinel",
	"persistence",
	"fetch-ai",
	"crypto-org",
	"sifchain",
	"ki chain",
	"osmosis",
	"certik",
	"emoney",
	"binance",
];
const tokenImg = [cosmos, kava, iris, starname, band, akash, sentinel, persistence, fetchAi, cryptoOrg, sifchain, kichain, osmosis, certik, emoney, binance];

export default function(props) {
	const history = useHistory();
	const [open, setOpen] = useState(false);

	const toMain = useCallback(() => history.push("/"), [history]);

	const handleChange = useCallback(
		network => {
			if (network === "cosmos") window.open(consts.MINTSCAN_URL.COSMOS, "_blank");
			else if (network === "kava") window.open(consts.MINTSCAN_URL.KAVA, "_blank");
			else if (network === "iris") window.open(consts.MINTSCAN_URL.IRIS, "_blank");
			else if (network === "starname") window.open(consts.MINTSCAN_URL.STARNAME, "_blank");
			else if (network === "band") window.open(consts.MINTSCAN_URL.BAND, "_blank");
			else if (network === "akash") window.open(consts.MINTSCAN_URL.AKASH, "_blank");
			else if (network === "sentinel") window.open(consts.MINTSCAN_URL.SENTINEL, "_blank");
			else if (network === "persistence") window.open(consts.MINTSCAN_URL.PERSISTENCE, "_blank");
			else if (network === "fetch-ai") window.open(consts.MINTSCAN_URL.FETCHAI, "_blank");
			else if (network === "crypto-org") window.open(consts.MINTSCAN_URL.CRYPTOORG, "_blank");
			else if (network === "sifchain") window.open(consts.MINTSCAN_URL.SIFCHAIN, "_blank");
			else if (network === "ki chain") window.open(consts.MINTSCAN_URL.KICHAIN, "_blank");
			else if (network === "certik") window.open(consts.MINTSCAN_URL.CERTIK, "_blank");
			else if (network === "osmosis") window.open(consts.MINTSCAN_URL.OSMOSIS, "_blank");
			else if (network === "emoney") window.open(consts.MINTSCAN_URL.EMONEY, "_blank");

			setOpen(v => !v);
		},
		[setOpen]
	);

	const render = useCallback(
		open => {
			console.count("AppBar rerender");
			return (
				<div className={cx("SearchAppBar-root")} id={"Header-fixed-id"}>
					<Toolbar className={cx("toolbar")}>
						<NavLink to='/' onClick={toMain}>
							<img src={logo} alt={"logo"} />
						</NavLink>
						<div className={cx("select-wrapper")}>
							<div className={cx("net-select-wrapper")}>
								<button className={cx("select-btn")} onClick={() => setOpen(v => !v)}>
									<div className={cx("curr-net-wrapper")}>
										<div className={cx("net-icon")} style={{backgroundImage: `url(${binance})`}} />
										{consts.NETWORK.BINANCE}
									</div>
									<img className={cx("arrow-icon", {upsideDown: open})} src={dropdownArrow} alt={"none"} />
								</button>
								<div className={cx("select-item-list", {hide: !open})}>
									{_.map(avaliableNetworks, (network, idx) => (
										<div className={cx("select-item")} key={network} onClick={() => handleChange(network)}>
											<div className={cx("net-icon")} style={{backgroundImage: `url(${tokenImg[idx]}`}} />
											{(() => {
												switch (network) {
													case "iris":
														return consts.NETWORK.IRIS;
													case "kava":
														return consts.NETWORK.KAVA;
													case "binance":
														return consts.NETWORK.BINANCE;
													case "starname":
														return consts.NETWORK.STARNAME;
													case "band":
														return consts.NETWORK.BAND;
													case "akash":
														return consts.NETWORK.AKASH;
													case "sentinel":
														return consts.NETWORK.SENTINEL;
													case "persistence":
														return consts.NETWORK.PERSISTENCE;
													case "crypto-org":
														return consts.NETWORK.CRYPTOORG;
													case "fetch-ai":
														return consts.NETWORK.FETCHAI;
													case "sifchain":
														return consts.NETWORK.SIFCHAIN;
													case "ki chain":
														return consts.NETWORK.KICHAIN;
													case "osmosis":
														return consts.NETWORK.OSMOSIS;
													case "certik":
														return consts.NETWORK.CERTIK;
													case "emoney":
														return consts.NETWORK.EMONEY;
													default:
														return consts.NETWORK.COSMOS;
												}
											})()}
										</div>
									))}
								</div>
							</div>
							<SearchArea propCx={cx} dropdownStyle={{position: "fixed", width: "459px"}} />
						</div>
					</Toolbar>
				</div>
			);
		},
		[toMain, handleChange]
	);
	return useMemo(() => render(open), [render, open]);
}
