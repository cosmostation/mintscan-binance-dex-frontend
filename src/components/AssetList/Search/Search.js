import * as React from "react";
import {_} from "src/lib/scripts";
//  components
import {InputBase} from "@material-ui/core";
import {useDelayedInput} from "src/hooks";

export default function Search({cx, setSearch}) {
	const delayedSetValue = useDelayedInput(setSearch, 200);

	const searchFunc = React.useCallback(e => delayedSetValue(_.trim(e.target.value)), [delayedSetValue]);

	return (
		<div className={cx("search-wrapper")}>
			<div className={cx("search")}>
				<InputBase className={cx("input")} placeholder='asset, name, currency' onChange={searchFunc} />
			</div>
			<button className={cx("searchBtn")}>Search</button>
		</div>
	);
}
