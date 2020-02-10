import React, {useEffect, useState} from "react";

import {AppBar} from "@material-ui/core";

import SearchAppBar from "src/components/Header/SearchAppBar/SearchAppBar";
import SubHeader from "src/components/Header/SubHeader/SubHeader";

export default function(props) {
	const [navBarOpen, setNavBarOpen] = useState(false);

	const hamburgerClick = () => setNavBarOpen(v => !v);

	useEffect(() => {
		if (navBarOpen) console.log("open nav bar");
	}, [navBarOpen]);

	return (
		<AppBar position={"fixed"}>
			<SearchAppBar hamburgerClick={hamburgerClick} />
			<SubHeader navBarOpen={navBarOpen} setNavBarOpen={setNavBarOpen} />
		</AppBar>
	);
}
