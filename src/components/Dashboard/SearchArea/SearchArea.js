import * as React from "react";
import cn from "classnames/bind";
import styles from "./SearchArea.scss";
//  components
import SearchArea from "src/components/common/SearchArea";
import consts from "src/constants/consts";
import LinkCard from "src/components/Dashboard/LinkCard";
//  assets
import iosIcon from "src/assets/dashboard/appstore_img.svg";
import googleIcon from "src/assets/dashboard/playstore.svg";

const cx = cn.bind(styles);

export default function() {
	return React.useMemo(
		() => (
			<div className={cx("SearchArea")}>
				<div className={cx("wrapper")}>
					<div className={cx("title-wrapper")}>
						<h1 className={cx("title")}>
							BINANCE CHAIN <span>EXPLORER</span>
						</h1>
						<p className={cx("byCosmostation")}>By Cosmostation</p>
					</div>
					<div className={cx("search-wrapper")}>
						<SearchArea propCx={cx} dropdownStyle={{position: "fixed", zIndex: 15}} interactiveWidth={true} />
					</div>
					<div className={cx("link-wrapper")}>
						{/* google, appstore, web wallet */}
						<div className={cx("link-btn-wrapper")}>
							<LinkCard link={consts.LINK.GOOGLE} icon={googleIcon} />
							<LinkCard link={consts.LINK.IOS} icon={iosIcon} />
						</div>
					</div>
				</div>
			</div>
		),
		[]
	);
}
