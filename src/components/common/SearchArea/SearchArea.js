import React from "react";
import cn from "classnames/bind";
import styles from "./SearchArea.scss";
//  hooks
import {useSearch} from "src/hooks";

//components
import {InputBase} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {useSelector} from "react-redux";
import Dropdown from "./Dropdown";

const cx = cn.bind(styles);

export default function({propCx, dropdownStyle = {}}) {
	const assets = useSelector(state => state.assets.assets);
	const [showDropdown, setShowDropdown] = React.useState(false);
	const [input, setInput] = React.useState("");
	const search = useSearch();

	const onKeyPress = e => {
		if (e.key === "Enter") clickSearch();
	};
	const onChange = e => {
		setInput(e.target.value);
	};
	const clickSearch = e => {
		search(input);
		setInput("");
	};
	return (
		<div className={propCx("search")}>
			<div className={cx("SearchArea-wrapper")}>
				<InputBase
					className={propCx("input")}
					placeholder='Search by Block, transaction, asset, address or orderid...'
					onKeyPress={onKeyPress}
					onChange={onChange}
					value={input}
					onFocus={() => setShowDropdown(true)}
					onBlur={() => setShowDropdown(false)}
				/>
				<Dropdown show={showDropdown} customStyles={dropdownStyle} value={input} />
			</div>
			<button className={propCx("searchBtn")} onClick={clickSearch}>
				<SearchIcon style={{color: "#fff"}} />
			</button>
		</div>
	);
}
