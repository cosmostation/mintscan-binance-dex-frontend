import React from "react";
import cn from "classnames/bind";
import styles from "./Dropdown.scss";
import consts from "src/constants/consts";

import {useHistory} from "src/hooks";
import {_, empty} from "src/lib/scripts";
import DisplayIcon from "src/components/common/DisplayIcon";

const symbolNoneSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";
const cx = cn.bind(styles);

export default function({input = "", foundAssets = [], setSelected = () => {}, customStyles = {}, state = {show: false, selected: 0}, width = null}) {
	const history = useHistory();
	const focusedElement = React.useRef(null);

	React.useEffect(() => {
		if (_.isNil(focusedElement.current)) return;

		focusedElement.current.scrollIntoView({block: "nearest"});
	}, [focusedElement, state.selected]);

	const dropdownList = React.useMemo(
		() => (
			<>
				{_.map(foundAssets, (v, i) => (
					<li
						ref={i === state.selected ? focusedElement : null}
						key={v.asset}
						className={cx({selected: i === state.selected})}
						onClick={() => history.replace((!_.includes(history.location.pathname, "assets") ? "assets/" : "") + v.asset)}
						onMouseEnter={() => setSelected(i)}>
						<DisplayIcon image={v.assetImg !== "" ? v.assetImg : symbolNoneSVG} size={20} />
						<div className={cx("content")}>
							{v.mappedAsset}
							<span className={cx("name")}>({v.name})</span>
						</div>
					</li>
				))}
			</>
		),
		[foundAssets, setSelected, state.selected, history]
	);

	const finalStyle = React.useMemo(() => {
		if (_.isNil(width)) return customStyles;
		return {...customStyles, width};
	}, [customStyles, width]);
	return (
		<ul className={cx("Dropdown-wrapper", {visible: state.show && (input.length >= 3 || !empty(foundAssets))})} style={finalStyle}>
			<div className={cx("defaultText", {visible: input.length >= 3 && foundAssets.length === 0})}>
				<span>Search for:</span>
				<span>{input}</span>
			</div>
			{dropdownList}
		</ul>
	);
}
