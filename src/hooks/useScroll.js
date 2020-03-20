import {useEffect, useState} from "react";

export default function useScroll(targetY = 100) {
	const [after, setAfter] = useState(false);
	useEffect(() => {
		let callbackFunc;
		if (!after) {
			callbackFunc = e => {
				if (window.scrollY > targetY) setAfter(true);
			};
			window.addEventListener("scroll", callbackFunc);
		} else {
			callbackFunc = e => {
				if (window.scrollY <= targetY) setAfter(false);
			};
			window.addEventListener("scroll", callbackFunc);
		}
		return () => window.removeEventListener("scroll", callbackFunc);
	}, [after, targetY]);
	return after;
}
