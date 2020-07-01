import React from "react";
import CoolImg from "react-cool-img";

import symbolNoneSVG from "src/assets/transactions/symbol_none.svg";

import spinner from "src/assets/common/spin.svg";
const retrySettings = {count: 0};
export default function Img({src, style, className}) {
	return <CoolImg retry={retrySettings} style={style} src={src} alt={"img"} placeholder={spinner} error={symbolNoneSVG} className={className} />;
}
