import React, {useCallback, useMemo, useState} from "react";
import cn from "classnames/bind";
import styles from "./SearchAppBar.scss";
import _ from "lodash";
import {NavLink} from "react-router-dom";
import {useHistory} from "src/hooks";
//  components
import SearchArea from "src/components/common/SearchArea";
import {Toolbar} from "@material-ui/core";

import consts from "src/constants/consts";

const arrowDown = process.env.PUBLIC_URL + "/assets/icons/common/arrow-down.svg";
const binance = process.env.PUBLIC_URL + "/assets/icons/navigation/chain_ic.svg";
const iris = process.env.PUBLIC_URL + "/assets/icons/common/iris_token.svg";
const kava = process.env.PUBLIC_URL + "/assets/icons/common/kava_token.svg";
const cosmos = process.env.PUBLIC_URL + "/assets/icons/common/atom_token.svg";
const logo = process.env.PUBLIC_URL + "/assets/icons/common/mintscan_logo.svg";

const cx = cn.bind(styles);

const avaliableNetworks = ["cosmos", "kava", "iris"];
const tokenImg = [cosmos, kava, iris];

export default function(props) {
	const history = useHistory();
	const [open, setOpen] = useState(false);

	const toMain = useCallback(() => history.push("/"), [history]);

	const handleChange = useCallback(
		network => {
			if (network === "cosmos") window.open(consts.MINTSCAN_URL.COSMOS, "_blank");
			else if (network === "kava") window.open(consts.MINTSCAN_URL.KAVA, "_blank");
			else if (network === "iris") window.open(consts.MINTSCAN_URL.IRIS, "_blank");
			setOpen(v => !v);
		},
		[setOpen]
	);

	const render = useCallback(
		open => {
			console.count("rerender");
			return (
				<div className={cx("SearchAppBar-root")}>
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
									<img className={cx("arrow-icon", {upsideDown: open})} src={arrowDown} alt={"none"} />
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
													default:
														return consts.NETWORK.COSMOS;
												}
											})()}
										</div>
									))}
								</div>
							</div>
							<SearchArea propCx={cx} dropdownStyle={{position: "fixed", width: "408.92px"}} />
							{/* hamburger button */}
							{/*<IconButton className={cx("menuButton")} color='inherit' onClick={props.hamburgerClick}>*/}
							{/*	<MenuIcon />*/}
							{/*</IconButton>*/}
						</div>
					</Toolbar>
				</div>
			);
		},
		[toMain, handleChange]
	);
	return useMemo(() => render(open), [render, open]);
}
