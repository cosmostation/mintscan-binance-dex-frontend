import React, {useState, useCallback, useMemo} from "react";
import cn from "classnames/bind";
import styles from "./SearchAppBar.scss";
import _ from "lodash";

//  router
import {NavLink, useHistory} from "react-router-dom";

//  material ui
import {AppBar, Toolbar, InputBase, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";

//  assets
import binance from "src/assets/icons/navigation/chain_ic.svg";
import iris from "src/assets/icons/common/iris_token.svg";
import kava from "src/assets/icons/common/kava_token.svg";
import cosmos from "src/assets/icons/common/atom_token.svg";

import arrowDown from "src/assets/icons/common/arrow-down.svg";
import logo from "src/assets/icons/common/mintscan_logo.svg";
import consts from "src/assets/consts";

const cx = cn.bind(styles);

const avaliableNetworks = ["cosmos", "kava", "iris"];
const tokenImg = [cosmos, kava, iris];

export default function(props) {
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");

	const toMain = useCallback(() => history.push("/"), [history]);

	const handleChange = network => {
		if (network === "cosmos") window.open(consts.MINTSCAN_URL.COSMOS, "_blank");
		else if (network === "kava") window.open(consts.MINTSCAN_URL.KAVA, "_blank");
		else if (network === "iris") window.open(consts.MINTSCAN_URL.IRIS, "_blank");
		setOpen(v => !v);
	};

	const handleSearch = useCallback(async searchText => {
		alert(`searchText => ${searchText}, add logic plz`);
	}, []);

	const handleKeyPress = useCallback(
		e => {
			if ((e.which === 13 || e.keyCode === 13) && e.target.value) handleSearch(e.target.value);
		},
		[handleSearch]
	);

	const handleInputChange = e => setSearch(e.target.value);

	const clickSearch = useCallback(() => handleSearch(search), [handleSearch, search]);

	const render = useCallback(
		(search, open) => {
			console.log("rerender");
			return (
				<div className={cx("SearchAppBar-root")}>
					<AppBar position={"fixed"} className={cx("AppBar")}>
						<Toolbar className={cx("toolbar")}>
							<NavLink to='/' onClick={toMain}>
								<img src={logo} alt={"logo"} className={cx("logoImg")} />
							</NavLink>

							{/* network select */}
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
								<div className={cx("search")}>
									<InputBase
										className={cx("input")}
										placeholder='Search by Block, transaction, asset, address or orderid...'
										onKeyPress={handleKeyPress}
										onChange={handleInputChange}
									/>
									<button className={cx("searchBtn")} onClick={clickSearch}>
										<SearchIcon style={{color: "#fff"}} />
									</button>
								</div>
								{/* hamburger button */}
								<IconButton className={cx("menuButton")} color='inherit' onClick={props.hamburgerClick}>
									<MenuIcon />
								</IconButton>
							</div>
						</Toolbar>
					</AppBar>
				</div>
			);
		},
		[clickSearch, handleKeyPress, props.hamburgerClick, toMain]
	);

	return useMemo(() => render(search, open), [render, search, open]);
}
