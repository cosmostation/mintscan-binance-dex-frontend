import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getCryptoAssetImages} from "src/store/modules/assets";

export default function usePreload() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCryptoAssetImages())
	}, [dispatch]);
}