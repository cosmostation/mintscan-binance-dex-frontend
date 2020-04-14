import React from "react";
import styles from "./NotFound.scss";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
//  hooks
import {useFetch, useSelector} from "src/hooks";
//  assets
import notFoundSVG from "src/assets/misc/404_img.svg";
import binanceHasTxSVG from "src/assets/misc/binanceHasTx.svg";
import nextSVG from "src/assets/misc/arrow-next-gr.svg";
import Loading from "src/components/common/Loading";
import DisplayLongString from "src/components/common/DisplayLongString";

const cx = classNames.bind(styles);

const NotFound = ({altText = "Sorry! Page Not Found"}) => {
	const accelAPI = useSelector(state => state.blockchain.acceleratedNode);
	const [state, , setUrl] = useFetch("");
	const [altLink, setAltLink] = React.useState("");
	const [route, data] = React.useMemo(() => getRoute(), []);
	React.useEffect(() => {
		if (route === "tx") {
			setUrl(`${accelAPI}${consts.BINANCE_API_ENDPOINTS.TX(data)}`);
		}
	}, [accelAPI, setUrl, route, data]);

	React.useEffect(() => {
		if (!_.isNil(state.data?.height) && !state.error) {
			setAltLink(`https://explorer.binance.org/tx/${data}`);
		}
	}, [state, data]);

	if (!_.isNil(route) && !state.error && _.isNil(state.data)) return <Loading />;

	return (
		<>
			{_.isNil(route) || (altLink === "" && !_.isNil(route)) ? (
				<div className={cx("notFound-wrapper")}>
					<img src={notFoundSVG} alt='not found' />
					<h2>{altText}</h2>
				</div>
			) : (
				<div className={cx("notFound_inBinance-wrapper")}>
					<img src={binanceHasTxSVG} alt='not found' />
					<div className={cx("border")}>
						<p>
							<DisplayLongString inputString={data} displayThresh={12} medium={true} />
						</p>
					</div>
					<h2>Tx can be found in binance explorer</h2>

					<button onClick={() => window.open(altLink, "__blank")}>
						<span>BINANCE EXPLORER</span>
						<img src={nextSVG} alt='next' />
					</button>
				</div>
			)}
		</>
	);
};

const getRoute = () => {
	if (window.location.pathname.startsWith("/txs")) return ["tx", window.location.pathname.split("/txs/")[1]];
	return [null, ""];
};

export default NotFound;
