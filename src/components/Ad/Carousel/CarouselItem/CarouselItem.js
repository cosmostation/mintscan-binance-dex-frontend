import React from "react";
import styles from "./CarouselItem.scss";

export const CarouselItem = ({imgSrc, linkObj, customLink}) => {
	const onClick = () => {
		if (linkObj.type === "APPEND_ACCOUNT") {
			const link = linkObj.base + customLink;

			window.open(link, "_blank");
			return;
		}

		window.open(linkObj.base, "_blank");
	};

	return (
		<button className={styles.item} onClick={onClick}>
			<img src={imgSrc} alt={linkObj.base} />
		</button>
	);
};

export default CarouselItem;
