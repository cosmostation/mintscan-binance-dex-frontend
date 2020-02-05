import React, {useCallback, useState} from "react";
import cn from "classnames/bind";
import styles from "./Header.scss";
import _ from "lodash";

//  router
import {NavLink, useHistory} from "react-router-dom";

//  material ui
import {AppBar, Toolbar, InputBase, IconButton} from "@material-ui/core";

//  assets
import binance from "src/assets/icons/common/binance_token.svg";
import arrowDown from "src/assets/icons/common/arrow-down.svg";
import arrowUp from "src/assets/icons/common/arrow-up.svg";
import logo from "src/assets/icons/common/mintscan_logo.svg";
import consts from "src/assets/consts";

const cx = cn.bind(styles);

const avaliableNetworks = ["cosmos", "kava", "iris"];

export default function(props) {
	const history = useHistory();
	const [open, setOpen] = useState(false);

	const toMain = useCallback(() => history.push("/"), []);

	const handleChange = network => {
		alert("handle it");
	};

	return (
		<div className={cx("header-root")}>
			<AppBar position={"fixed"} className={cx("AppBar")}>
				<Toolbar className={cx("toolbar")}>
					<NavLink to='/' onClick={toMain}>
						<img src={logo} alt={"logo"} className={cx("logoImg")} />
					</NavLink>

					{/* network select */}
					<div className={cx("select-wrapper")}>
						<div className={cx("net-select-wrapper")}>
							<button
								className={cx("select-btn")}
								onClick={() => setOpen(v => !v)}>
								<div className={cx("curr-net-wrapper")}>
									<div
										className={cx("net-icon")}
										style={{backgroundImage: `url(${binance})`}}
									/>
									{consts.NETWORK.BINANCE}
								</div>
								<img
									className={cx("arrow-icon")}
									src={open ? arrowUp : arrowDown}
									alt={open ? "arrowUp" : "arrowDown"}
								/>
							</button>
							<div className={cx("select-item-list", {hide: !open})}>
								{_.map(avaliableNetworks, network => {
									return (
										<div
											className={cx("select-item")}
											key={network}
											onClick={() => handleChange(network)}>
											<div className={cx("net-icon", network)} />
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
									);
								})}
							</div>
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
