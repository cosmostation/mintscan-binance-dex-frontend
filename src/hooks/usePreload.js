import {useEffect} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import consts from "src/constants/consts";
//  reduxy
import {getCryptoAssets, getCryptoBep8} from "src/store/modules/assets";
import {getCryptoBasicData, getCryptoFees, getCryptoStatus, getCryptoValidators, getCyptoAcceleratedNode} from "src/store/modules/blockchain";
//  hooks

export default function usePreload() {
	const dispatch = useDispatch();

	//  initial load
	useEffect(() => {
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		dispatch(getCyptoAcceleratedNode());
		dispatch(getCryptoBasicData("binancecoin", "usd", source.token));
		dispatch(getCryptoStatus(source.token));
		dispatch(getCryptoFees(source.token));
		dispatch(getCryptoValidators(source.token));
		if (window.location.pathname !== "/assets/") {
			dispatch(getCryptoAssets(source.token));
			dispatch(getCryptoBep8(source.token));
		}
	}, [dispatch]);

	//  getWithInterval BASIC_DATA_FETCH_INTERVAL_MS
	useEffect(() => {
		const interval = setInterval(() => {
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
