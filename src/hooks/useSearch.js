import {useEffect, useState} from "react";
import {useHistory} from "src/hooks";
import {useSelector} from "react-redux";

import {_, searchProperties} from "src/lib/scripts";
import consts from "src/constants/consts";

export default function useSearch() {
	const history = useHistory();
	const assets = useSelector(state => state.assets.assets);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (search === "") return;
		const type = checkType(search);
		if (type === "address") history.push(`/account/${search}`);
		else if (type === "block") history.push(`/blocks/${search}`);
		else if (type === "asset") {
			const find = _.find(assets, v => {
				return searchProperties(v, consts.ASSET.NAME_SEARCH_PROPERTY, search.toUpperCase());
			});
			history.push(`/assets/${find?.asset ? find.asset : "notFound"}`);
		} else if (type === "orderId") {
		} else history.push(`/txs/${search}`);
		setSearch("");
	}, [search, history, assets]);

	return setSearch;
}

const checkType = input => {
	if (!_.isString(input)) return null;
	if (input.substring(0, 3).toLowerCase() === "bnb" && input.length >= 16) return "address";
	else if (!isNaN(_.toNumber(input))) return "block";
	else if (input.length < 20) return "asset";
	else if (!isNaN(_.toNumber(input.split("-")[1]))) return "orderId";
	else return "tx";
};
