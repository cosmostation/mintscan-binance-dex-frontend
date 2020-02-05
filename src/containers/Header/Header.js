import React, {useEffect, useState} from "react";

import HeaderWrapper from "src/components/Header/HeaderWrapper/HeaderWrapper";
import SearchAppBar from "src/components/Header/SearchAppBar/SearchAppBar";
import SubHeader from "src/components/Header/SubHeader/SubHeader";

export default function(props) {
	const [navBarOpen, setNavBarOpen] = useState(false);

	const hamburgerClick = () => setNavBarOpen(v => !v);

	useEffect(() => {
		if (navBarOpen) console.log("open nav bar");
	}, [navBarOpen]);

	return (
		<header>
			<HeaderWrapper>
				<SearchAppBar hamburgerClick={hamburgerClick} />
				<SubHeader navBarOpen={navBarOpen} setNavBarOpen={setNavBarOpen} />
			</HeaderWrapper>
		</header>
	);
}
