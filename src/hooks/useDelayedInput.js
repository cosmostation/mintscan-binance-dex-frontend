import {useEffect, useState} from "react";

export default function useDelayedInput(setFunc = () => {}, timeout = 200) {
	const [value, setValue] = useState("");
	useEffect(() => {
		const delay = setTimeout(() => {
			setFunc(value);
		}, timeout);
		return () => clearTimeout(delay);
	}, [value, timeout, setFunc]);

	return setValue;
}
