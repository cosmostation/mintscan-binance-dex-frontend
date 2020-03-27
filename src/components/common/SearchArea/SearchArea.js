import React from "react";
import cn from "classnames/bind";
import styles from "./SearchArea.scss";

//  redux
import {useSelector} from "react-redux";

//  hooks
import {useSearch, useDelayedInput} from "src/hooks";
//components
import {InputBase} from "@material-ui/core";
import Dropdown from "./Dropdown";
import useWindowSize from "src/hooks/useWindowSize";
import {_, empty, searchProperties} from "src/lib/scripts";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

const SearchIcon = process.env.PUBLIC_URL + "/assets/icons/common/search-icon.svg";

const PROBABLY_SAFE_REFRESH_INTERVAL_MS = 100;

export default function({propCx, dropdownStyle = {}, interactiveWidth = false}) {
	const assets = useSelector(state => state.assets.assets);
	const SearchRef = React.useRef(null);
	const [input, setInput] = React.useState("");
	const [value, setValue] = React.useState("");
	const delayedSetValue = useDelayedInput(setInput, 200);

	const search = useSearch();
	const [dropdownState, setDropdownState] = React.useState({selected: 0, show: false});
	const [widthDropdown, setWidthDropdown] = React.useState(0);
	const windowSize = useWindowSize();

	const setSelected = React.useCallback(
		idx => {
			setDropdownState(v => ({...v, selected: idx}));
		},
		[setDropdownState]
	);

	React.useEffect(() => {
		delayedSetValue(_.trim(value));
		setSelected(0);
	}, [delayedSetValue, value]);

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
			setValue("");
		},
		[input, search]
	);

	//  return found Assets
	const foundAssets = React.useMemo(() => {
		if (empty(input) || empty(assets)) return [];
		return _.filter(assets, v => searchProperties(v, consts.ASSET.NAME_SEARCH_PROPERTY, input.toUpperCase()));
	}, [input, assets]);

	const onKeyDown = React.useCallback(
		e => {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				if (dropdownState.selected <= 0 && e.key === "ArrowUp") return;
				if (e.key === "ArrowDown" && dropdownState.selected >= foundAssets.length - 1) return;
				if (e.key === "ArrowDown") setSelected(dropdownState.selected + 1);
				else setSelected(dropdownState.selected - 1);
			} else if (e.key === "Escape") {
				// e.currentTarget.blur();
				setValue("");
			}
		},
		[dropdownState.selected, foundAssets.length, setSelected]
	);

	const onKeyPress = React.useCallback(
		e => {
			if (e.key === "Enter") clickSearch();
		},
		[clickSearch]
	);

	const onChange = React.useCallback(e => {
		setValue(e.target.value);
	}, []);

	const onFocus = bool => {
		setDropdownState({show: bool, selected: 0});
		setValue("");
	};

	return React.useMemo(
		() => (
			<div className={propCx("search")}>
				<div className={cx("SearchArea-wrapper")} ref={SearchRef}>
					<InputBase
						className={propCx("input")}
						placeholder='Search by Block, transaction, asset, address or orderid...'
						onKeyDown={onKeyDown}
						onKeyPress={onKeyPress}
						onChange={onChange}
						value={value}
						onFocus={() => onFocus(true)}
						onBlur={() => setTimeout(() => onFocus(false), PROBABLY_SAFE_REFRESH_INTERVAL_MS)}
					/>
					<Dropdown
						foundAssets={foundAssets}
						setSelected={setSelected}
						width={interactiveWidth ? widthDropdown : null}
						state={dropdownState}
						customStyles={dropdownStyle}
						input={input}
					/>
				</div>
				<button className={propCx("searchBtn")} onClick={clickSearch}>
					<img className={propCx("searchIcon")} src={SearchIcon} alt={"search"} />
				</button>
			</div>
		),
		[
			propCx,
			onKeyDown,
			onKeyPress,
			onChange,
			value,
			foundAssets,
			setSelected,
			interactiveWidth,
			widthDropdown,
			dropdownState,
			dropdownStyle,
			input,
			clickSearch,
		]
	);
}
