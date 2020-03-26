import React from "react";
import cn from "classnames/bind";
import styles from "./SearchArea.scss";
//  hooks
import {useSearch} from "src/hooks";

//components
import {InputBase} from "@material-ui/core";
import Dropdown from "./Dropdown";
import useWindowSize from "src/hooks/useWindowSize";

const cx = cn.bind(styles);

const SearchIcon = process.env.PUBLIC_URL + "/assets/icons/common/search-icon.svg";

// TODO
//  memoize this one well because of useWindowSize

export default function({propCx, dropdownStyle = {}, interactiveWidth = false}) {
	const SearchRef = React.useRef(null);
	const [showDropdown, setShowDropdown] = React.useState(false);
	const [input, setInput] = React.useState("");
	const search = useSearch();

	const [widthDropdown, setWidthDropdown] = React.useState(0);
	const windowSize = useWindowSize();

	React.useEffect(() => {
		if (!interactiveWidth) return;
		setWidthDropdown(SearchRef.current?.getBoundingClientRect()?.width);
	}, [interactiveWidth]);

	React.useEffect(() => {
		if (!interactiveWidth) return;
		if (SearchRef.current?.getBoundingClientRect()?.width !== widthDropdown) setWidthDropdown(SearchRef.current?.getBoundingClientRect()?.width);
	}, [interactiveWidth, widthDropdown, windowSize.width]);

	const clickSearch = React.useCallback(
		e => {
			search(input);
			setInput("");
		},
		[input, search]
	);
	const onKeyPress = React.useCallback(
		e => {
			if (e.key === "Enter") clickSearch();
		},
		[clickSearch]
	);
	const onChange = React.useCallback(e => {
		setInput(e.target.value);
	}, []);
	return React.useMemo(
		() => (
			<div className={propCx("search")}>
				<div className={cx("SearchArea-wrapper")} ref={SearchRef}>
					<InputBase
						className={propCx("input")}
						placeholder='Search by Block, transaction, asset, address or orderid...'
						onKeyPress={onKeyPress}
						onChange={onChange}
						value={input}
						onFocus={() => setShowDropdown(true)}
						onBlur={() => setShowDropdown(false)}
					/>
					<Dropdown width={interactiveWidth ? widthDropdown : null} show={showDropdown} customStyles={dropdownStyle} value={input} />
				</div>
				<button className={propCx("searchBtn")} onClick={clickSearch}>
					<img className={propCx("searchIcon")} src={SearchIcon} alt={"search"} />
				</button>
			</div>
		),
		[clickSearch, dropdownStyle, input, interactiveWidth, onChange, onKeyPress, propCx, showDropdown, widthDropdown]
	);
}
