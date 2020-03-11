import {useEffect, useState} from "react";

export default function(watch, ms) {
	const [ticker, setTicker] = useState(0);
	const [watcher, setWatch] = useState(watch);

	useEffect(() => {
		// console.log(watcher, ms);
		let interval = setInterval(() => setTicker(v => v + 1), ms);
		return () => clearInterval(interval);
	}, [ms]);
	return [watcher ? ticker : undefined, setWatch];
}
