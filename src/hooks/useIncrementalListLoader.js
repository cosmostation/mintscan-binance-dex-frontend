import {useEffect, useState} from "react";
import {empty} from "src/lib/scripts";

const LIST_LOAD_DELAY_MS = 100;
const LIST_LOAD_ITEM_SIZE = 10;

//  Already loaded contents must not change
export default function useIncrementalListLoader(listLoadDelay = LIST_LOAD_DELAY_MS, size = LIST_LOAD_ITEM_SIZE) {
	const [list, setList] = useState([]);
	const [outputList, setOutputList] = useState([]);

	//  incremental loading
	useEffect(() => {
		if (outputList.length === list.length || empty(list)) return;
		const timeout = setTimeout(() => {
			setOutputList(v => [...v, ...list.slice(v.length, Math.min(v.length + LIST_LOAD_ITEM_SIZE, list.length))]);
		}, LIST_LOAD_DELAY_MS);
		return () => {
			clearTimeout(timeout);
		};
	}, [list, outputList]);

	return [outputList, list, setList];
}
