import {useEffect, useMemo, useState} from "react";
import {_, empty} from "src/lib/scripts";
//  redux
import {useDispatch, useSelector} from "react-redux";
import {getCryptoAssetPrices} from "src/store/modules/assets";
//  hooks
import {useTimer} from "src/hooks";

export default function useGetPrices(interval = 3000) {
	const [ticker, setWatch] = useTimer(false, interval);
	const dispatch = useDispatch();
	const assets = useSelector(state => state.assets.assets);

	const [targetAssets, setTargetAssets] = useState([]);
	const [prices, setPrices] = useState([]);

	useEffect(() => {
		if (empty(assets) || empty(targetAssets)) return;
		setWatch(true);
	}, [assets, setWatch, targetAssets]);

	//  refetch data to redux on every tick
	useEffect(() => {
		if (ticker < 1) return;
		dispatch(getCryptoAssetPrices());
	}, [ticker, dispatch]);

	//  when assets update
	useEffect(() => {
		if (empty(targetAssets) || empty(assets)) return;
		const filtered = _.map(targetAssets, assetName => _.find(assets, asset => asset.asset === assetName));
		const newPrices = _.map(filtered, v => v?.price);

		//  value by value comparison
		if (_.isEqual(prices, newPrices)) return;
		console.log("newPrices>>");
		setPrices(newPrices);
		// eslint-disable-next-line
	}, [assets, targetAssets]);

	const returnPrices = useMemo(() => {
		if (empty(prices)) return null;
		return prices;
	}, [prices]);

	return [returnPrices, setTargetAssets];
}
