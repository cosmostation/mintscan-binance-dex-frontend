import React from "react";
import cn from "classnames/bind";
import styles from "./Dropdown.scss";
import consts from "src/constants/consts";

import {useSelector} from "react-redux";
import {useDelayedInput} from "src/hooks";
import {_, empty, searchProperties} from "src/lib/scripts";

const cx = cn.bind(styles);

export default function({customStyles = {}, value = "", show = false}) {
	const assets = useSelector(state => state.assets.assets);
	const [inputSearch, setInputSearch] = React.useState("");
	const delayedSetValue = useDelayedInput(setInputSearch, 200);
	const searchFunc = React.useCallback(v => delayedSetValue(_.trim(v)), [delayedSetValue]);

	//  search on delayed change
	React.useEffect(() => {
		searchFunc(value);
	}, [value, searchFunc]);

	//  return found Assets
	const foundAssets = React.useMemo(() => {
		if (empty(inputSearch) || empty(assets)) return [];
		return _.filter(assets, v => searchProperties(v, consts.ASSET.NAME_SEARCH_PROPERTY, inputSearch.toUpperCase()));
	}, [inputSearch, assets]);

	const dropdownList = React.useMemo(
		() => (
			<>
				{_.map(foundAssets, v => (
					<li>
						{v.mappedAsset} / {v.asset} / {v.name}
					</li>
				))}
			</>
		),
		[foundAssets]
	);

	return (
		<ul className={cx("Dropdown-wrapper", {visible: show && !empty(foundAssets)})} style={customStyles}>
			{dropdownList}
		</ul>
	);
}
