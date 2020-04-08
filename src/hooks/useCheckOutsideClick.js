import React from "react";
import {_} from "src/lib/scripts";

export default function useCheckOutsideClick() {
	const [ref, setRef] = React.useState(null);
	const [isClickedOuside, setIsClickedOutside] = React.useState(false);

	const handleClickOutside = React.useCallback(
		e => {
			if (!ref.current.contains(e.target)) {
				setIsClickedOutside(true);
				setTimeout(() => setIsClickedOutside(false), 0);
			}
		},
		[ref]
	);

	React.useEffect(() => {
		if (_.isNil(ref)) return () => document.removeEventListener("mousedown", handleClickOutside);
		setIsClickedOutside(false);
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [handleClickOutside, ref]);
	return [isClickedOuside, setRef];
}
