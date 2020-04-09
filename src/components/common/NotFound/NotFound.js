import React from "react";
import styles from "./NotFound.scss";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";

//  hooks
import {useFetch, useSelector} from "src/hooks";

//  assets
import notFoundImg from "src/assets/misc/404_img.svg";

const cx = classNames.bind(styles);

const NotFound = ({altText = "Sorry! Page Not Found"}) => {
	const accelAPI = useSelector(state => state.blockchain.acceleratedNode);
	const [state, , setUrl] = useFetch("");
	const [altLink, setAltLink] = React.useState(null);
	React.useEffect(() => {
		if (window.location.pathname.startsWith("/txs")) {
			setUrl(`${accelAPI}${consts.BINANCE_API_ENDPOINTS.TX(window.location.pathname.split("/txs")[1])}`);
		}
	}, [accelAPI, setUrl]);

	React.useEffect(() => {
		if (!_.isNil(state.data?.height)) {
			setAltLink(`https://explorer.binance.org/tx${window.location.pathname.split("/txs")[1]}`);
		}
	}, [state.data]);

	return (
		<div className={cx("notFound_wrapper")}>
			<img src={notFoundImg} alt='not found' />
			{altLink ? (
				<h2 className={cx("link")} onClick={() => window.open(altLink, "__blank")}>
					Tx can be found in binance explorer
				</h2>
			) : (
				<h2>{altText}</h2>
			)}
		</div>
	);
};

export default NotFound;
