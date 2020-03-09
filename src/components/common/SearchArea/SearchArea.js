import React from "react";
import {useSearch} from "src/hooks";
import {InputBase} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function({cx}) {
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
		<div className={cx("search")}>
			<InputBase
				className={cx("input")}
				placeholder='Search by Block, transaction, asset, address or orderid...'
				onKeyPress={onKeyPress}
				onChange={onChange}
				value={input}
			/>
			<button className={cx("searchBtn")} onClick={clickSearch}>
				<SearchIcon style={{color: "#fff"}} />
			</button>
		</div>
	);
}
