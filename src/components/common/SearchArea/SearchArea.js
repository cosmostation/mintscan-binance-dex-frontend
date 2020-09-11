import React from "react";
import cn from "classnames/bind";
import styles from "./SearchArea.scss";
//  redux
import {useSelector} from "react-redux";
//  hooks
import {useCheckOutsideClick, useDelayedInput, useHistory, useSearch} from "src/hooks";
//components
import {InputBase} from "@material-ui/core";
import Dropdown from "./Dropdown";
import useWindowSize from "src/hooks/useWindowSize";
import {_, compareProperty, empty, searchProperties, stringNumCheck} from "src/lib/scripts";
import consts from "src/constants/consts";
//  assests
import SearchIcon from "src/assets/common/search-icon.svg";

const cx = cn.bind(styles);

export default function({propCx, dropdownStyle = {}, interactiveWidth = false}) {
	const history = useHistory();

	//  redux
	const bep2 = useSelector(state => state.assets.assets);
	const bep8 = useSelector(state => state.assets.bep8);

	const assets = React.useMemo(() => {
		if (empty(bep2) || empty(bep8)) return null;
		return [...bep2, ...bep8];
	}, [bep2, bep8]);

	//  search related
	const SearchRef = React.useRef(null);
	const [input, setInput] = React.useState("");
	const [value, setValue] = React.useState("");
	const delayedSetValue = useDelayedInput(setInput, 200);
	const search = useSearch();
	const windowSize = useWindowSize();
	const [widthDropdown, setWidthDropdown] = React.useState(0);

	//  dropdown related
	const [isClickedOutside, setRef] = useCheckOutsideClick();
	const [dropdownState, setDropdownState] = React.useState({selected: 0, show: false});

	const setSelected = React.useCallback(
		idx => {
			setDropdownState(v => ({...v, selected: idx}));
		},
		[setDropdownState]
	);

	React.useEffect(() => {
		if (_.isNil(SearchRef?.current)) return;
		setRef(SearchRef);
	}, [setRef, SearchRef]);

	React.useEffect(() => {
		delayedSetValue(_.trim(value));
		setSelected(0);
	}, [delayedSetValue, setSelected, value]);

	React.useEffect(() => {
		if (!interactiveWidth) return;
		setWidthDropdown(SearchRef.current?.getBoundingClientRect()?.width);
	}, [interactiveWidth]);

	React.useEffect(() => {
		if (!interactiveWidth) return;
		if (SearchRef.current?.getBoundingClientRect()?.width !== widthDropdown) setWidthDropdown(SearchRef.current?.getBoundingClientRect()?.width);
	}, [interactiveWidth, widthDropdown, windowSize.width]);

	//  return found Assets
	const foundAssets = React.useMemo(() => {
		if (empty(input) || empty(assets) || !isNaN(Number(input))) return consts.DEFAULT_ARRAY;
		// filter, then sort in alphabetical order
		const filteredAssets = _.filter(assets, v => searchProperties(v, consts.ASSET.NAME_SEARCH_PROPERTY, input.toUpperCase()));
		filteredAssets.sort((a, b) => compareProperty(a, b, consts.ASSET.ORDER_COMPARE[0], "id", true));
		//  CAS goes to the bottom of the list when alphabetically ordered in either direction because you confused me for hours by showing up first when doing so
		//  for reasons unknown to me.
		//  Use the proper English alphabet next time mate.
		const CAS = _.remove(filteredAssets, v => v.id === 51);
		filteredAssets.push(...CAS);
		return filteredAssets;
	}, [input, assets]);

	const searchType = React.useMemo(() => {
		if (!_.isString(input)) return false;
		else if (stringNumCheck(input)) return "Block";
		else if (input.substring(0, 3).toLowerCase() === "bnb" && input.length === 42) return "Account";
		else if (input.length === 64) return "Transaction";
		else if (stringNumCheck(input.split("-")[1]) && input.split("-")[0].length === 40) return "Order Id";
		return false;
	}, [input]);

	const clickSearch = React.useCallback(
		e => {
			if (!searchType) return;
			search(input);
			setValue("");
		},
		[input, search, searchType]
	);

	//  exit and dropdown navigation
	const onKeyDown = React.useCallback(
		e => {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				if (dropdownState.selected <= 0 && e.key === "ArrowUp") return;
				if (e.key === "ArrowDown" && dropdownState.selected >= foundAssets.length - 1) return;
				if (e.key === "ArrowDown") setSelected(dropdownState.selected + 1);
				else setSelected(dropdownState.selected - 1);
			} else if (e.key === "Enter") {
				if (dropdownState.selected < foundAssets.length) {
					e.preventDefault();
					searchFunc(foundAssets[dropdownState.selected].asset, history);
					setValue("");
				}
			} else if (e.key === "Escape") {
				// e.currentTarget.blur();
				setValue("");
			}
		},
		[dropdownState.selected, foundAssets, setSelected, history]
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

	const onFocus = React.useCallback(bool => {
		setDropdownState({show: bool, selected: 0});
		setValue("");
	}, []);

	const onBlur = React.useCallback(() => {
		setDropdownState({show: false, selected: 0});
		setValue("");
	}, []);

	React.useEffect(() => {
		if (isClickedOutside) onBlur();
	}, [isClickedOutside, onBlur]);

	const renderInputBase = React.useMemo(
		() => (
			<InputBase
				className={propCx("input")}
				placeholder='Search by Block, transaction, asset, address or orderid...'
				onKeyDown={onKeyDown}
				onKeyPress={onKeyPress}
				onChange={onChange}
				value={value}
				onFocus={() => onFocus(true)}
			/>
		),
		[onChange, onFocus, onKeyDown, onKeyPress, propCx, value]
	);

	const dropdownRender = React.useMemo(
		() => (
			<Dropdown
				foundAssets={foundAssets}
				setSelected={setSelected}
				width={interactiveWidth ? widthDropdown : null}
				state={dropdownState}
				customStyles={dropdownStyle}
				input={input}
				searchType={searchType}
				clickSearch={clickSearch}
			/>
		),
		[clickSearch, dropdownState, dropdownStyle, foundAssets, input, interactiveWidth, searchType, setSelected, widthDropdown]
	);

	const buttonRender = React.useMemo(
		() => (
			<button className={propCx("searchBtn")} onClick={clickSearch}>
				<img className={propCx("searchIcon")} src={SearchIcon} alt={"search"} />
			</button>
		),
		[clickSearch, propCx]
	);
	return React.useMemo(
		() => (
			<div className={propCx("search")}>
				<div className={cx("SearchArea-wrapper")} ref={SearchRef}>
					{renderInputBase}
					{dropdownRender}
				</div>
				{buttonRender}
			</div>
		),
		[propCx, renderInputBase, dropdownRender, buttonRender]
	);
}

const searchFunc = (search, history) => {
	if (_.includes(history.location.pathname, "/txs/") || _.includes(history.location.pathname, "/blocks/") || _.includes(history.location.pathname, "/account/"))
		history.push("/assets/" + search);
	else history.replace((!_.includes(history.location.pathname, "/assets/") ? "assets/" : "") + search);
};
