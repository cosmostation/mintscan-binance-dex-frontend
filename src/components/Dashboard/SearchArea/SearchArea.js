import * as React from "react";
import cn from "classnames/bind";
import styles from "./SearchArea.scss";

//  components
import {InputBase} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import consts from "src/constants/consts";
import LinkCard from "src/components/Dashboard/LinkCard";

const iosIcon = process.env.PUBLIC_URL + "/assets/dashboard/appstore_img.svg";
const googleIcon = process.env.PUBLIC_URL + "/assets/dashboard/playstore.svg";
const cx = cn.bind(styles);

export default function(props) {
	const [input, setInput] = React.useState("");

	const onKeyPress = e => {
		if (e.key === "Enter") clickSearch();
	};
	const onChange = e => {
		setInput(e.target.value);
	};
	const clickSearch = e => {
		alert(`searching => ${input}`);
		setInput("");
	};
	return (
		<div className={cx("SearchArea")}>
			<div className={cx("wrapper")}>
				<div className={cx("title-wrapper")}>
					<h1 className={cx("title")}>
						BINANCE CHAIN <span>EXPLORER</span>
					</h1>
					<p className={cx("byCosmostation")}>By Cosmostation</p>
				</div>
				<div className={cx("search-wrapper")}>
					<div className={cx("search")}>
						<InputBase
							className={cx("input")}
							placeholder='Search by Block, transaction, asset, address or orderid...'
							onKeyPress={onKeyPress}
							onChange={onChange}
							value={input}
						/>
						<button className={cx("searchBtn")} onClick={clickSearch}>
							<SearchIcon style={{color: "#fff"}} />
						</button>
					</div>
				</div>
				<div className={cx("link-wrapper")}>
					{/* googel, appstore, web wallet */}
					<div className={cx("link-btn-wrapper")}>
						<LinkCard link={consts.LINK.GOOGLE} icon={googleIcon} />
						<LinkCard link={consts.LINK.IOS} icon={iosIcon} />
					</div>
				</div>
			</div>
		</div>
	);
}
