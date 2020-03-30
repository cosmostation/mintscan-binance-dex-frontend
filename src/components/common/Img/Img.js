import React from "react";
import CoolImg from "react-cool-img";

const spinner = process.env.PUBLIC_URL + "/assets/icons/common/spin.svg";
const none = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";

export default function Img({src, style, className}) {
	return <CoolImg style={style} src={src} alt={"img"} placeholder={spinner} error={none} className={className} />;
}
