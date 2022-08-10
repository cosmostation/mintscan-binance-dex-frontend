import React, {useState} from "react";

import Carousel from "./Carousel";
import CarouselItem from "./Carousel/CarouselItem";
import pstake_1200 from "src/assets/banner/pstake/pstake-1200.png";
import pstake_500 from "src/assets/banner/pstake/pstake-500.png";
import pstake_850 from "src/assets/banner/pstake/pstake-850.png";
import styles from "./Ad.scss";
import {useEffect} from "react";
import useWindowSize from "src/hooks/useWindowSize";

const adArray = [
	{
		img: {
			1200: pstake_1200,
			850: pstake_850,
			500: pstake_500,
		},
		link: {
			type: "STATIC",
			base: "https://bnb.pstake.finance/",
		},
	},
];

if (adArray.length === 2) {
	adArray.push(...adArray);
}

export default function Ad() {
	const windowSize = useWindowSize();
	const [itemWidth, setItemWidth] = useState(1200);

	useEffect(() => {
		if (!windowSize.width) {
			return;
		}

		if (windowSize.width >= 850) {
			if (itemWidth !== 1200) {
				setItemWidth(1200);
			}
		} else if (windowSize.width >= 500) {
			if (itemWidth !== 850) {
				setItemWidth(850);
			}
		} else if (itemWidth !== 500) {
			setItemWidth(500);
		}
	}, [itemWidth, windowSize.width]);

	return (
		<div className={styles.container}>
			<Carousel>
				{adArray.map((ad, idx) => (
					<CarouselItem key={idx} imgSrc={ad.img[itemWidth]} linkObj={ad.link} customLink='' />
				))}
			</Carousel>
		</div>
	);
}
