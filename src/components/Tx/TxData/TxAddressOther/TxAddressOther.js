import React from "react";

//  components
import InfoRow from "src/components/common/InfoRow";
import DisplayLongString from "src/components/common/DisplayLongString/DisplayLongString";

//TODO
//  put this elsewhere sometime

const getAddress = addr => {
	if (/^(kava)/.test(addr)) return "https://kava.mintscan.io/account/";
	return false;
};

export default function TxAddressOther({cx, addr = "", label = ""}) {
	const baseUrl = React.useMemo(() => getAddress(addr), [addr]);
	return (
		<InfoRow label={label}>
			{baseUrl ? (
				<div className={cx("blueColor")} onClick={() => window.open(`${baseUrl}${addr}`, "__blank")}>
					<DisplayLongString inputString={addr} />
				</div>
			) : (
				<span className={cx("flexIt")}>
					<DisplayLongString inputString={addr} />
				</span>
			)}
		</InfoRow>
	);
}
