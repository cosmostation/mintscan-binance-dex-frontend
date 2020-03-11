import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import {_} from "src/lib/scripts";

export default function useSearch() {
	const [search, setSearch] = useState("");
	const history = useHistory();
	useEffect(() => {
		if (search === "") return;
		const type = checkType(search);
		if (type === "address") history.push(`/address/${search}`);
		else if (type === "block") history.push(`/blocks/${search}`);
		else if (type === "asset") history.push(`/asset/${search}`);
		else if (type === "orderId") window.alert("query for tx and display that tx");
		else history.push(`/txs/${search}`);
	}, [search, history]);

	return setSearch;
}

const checkType = input => {
	if (!_.isString(input)) return null;
	if (input.substring(0, 3).toLowerCase() === "bnb") return "address";
	else if (!isNaN(_.toNumber(input))) return "block";
	else if (input.length < 20) return "asset";
	else if (!isNaN(_.toNumber(input.split("-")[1]))) return "orderId";
	else return "tx";
};
