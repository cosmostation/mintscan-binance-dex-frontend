import {useEffect} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import consts from "src/constants/consts";

//  reduxy
import {getCryptoAssets} from "src/store/modules/assets";
import {getCryptoBasicData, getCryptoStatus} from "src/store/modules/blockchain";

//  hooks
import {useHistory} from "src/hooks";

export default function usePreload() {
	const dispatch = useDispatch();

	//  initial load
	useEffect(() => {
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		dispatch(getCryptoBasicData("binancecoin", "usd", source.token));
		dispatch(getCryptoStatus(source.token));
		if (window.location.pathname !== "/assets/") dispatch(getCryptoAssets(source.token));
	}, [dispatch]);

	//  getWithInterval BASIC_DATA_FETCH_INTERVAL_MS
	useEffect(() => {
		let interval = setInterval(() => {
			const cancelToken = axios.CancelToken;
			const source = cancelToken.source();
			dispatch(getCryptoBasicData("binancecoin", "usd", source.token));

			//  spacing out the request
			//  probably won't need a cleanup function because it's never unloaded
			setTimeout(() => {
				const cancelToken = axios.CancelToken;
				const source = cancelToken.source();
				dispatch(getCryptoStatus(source.token));
			}, 1500);
		}, consts.NUM.BASIC_DATA_FETCH_INTERVAL_MS);
		return () => clearInterval(interval);
	}, [dispatch]);
}
