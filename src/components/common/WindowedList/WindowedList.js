import React from "react";
import {FixedSizeList as List} from "react-window";

export default function({data = [{}, {}], Comp, itemCnt}) {
	const Row = ({index}) => (
		<>
			<Comp {...data[index]} />
		</>
	);
	return (
		<List height={4000} width={1295} itemSize={25} itemCount={itemCnt}>
			{Row}
		</List>
	);
}
