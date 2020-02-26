import * as React from "react";
import cn from "classnames/bind";
import styles from "./Block.scss";
import {_} from "src/lib/scripts";

import consts from "src/constants/consts";
import useFetch from "src/hooks/useFetch/useFetch";

//  components
import BlockTitle from "src/components/Block/BlockTitle";
import BlockHeader from "src/components/Block/BlockHeader";

const cx = cn.bind(styles);

const baseURL = `${consts.API_BASE}${consts.API.BLOCKLIST}?&limit=1`;
export default function(props) {
	const {history} = props;
	const height = Number(props.match.params.height);
	const [data, refetch, setUrl] = useFetch(`${baseURL}&before=${height}`);

	React.useEffect(() => {
		if (height < 1 || isNaN(height)) {
			const height = data.data?.data?.[0]?.height;
			if (!_.isNil(height)) history.replace(`/blocks/${height}`);
		}
	}, [height, data.data]);

	const getBlock = React.useCallback(isPrev => {
		const newHeight = isPrev ? Number(height) - 1 : Number(height) + 1;
		if (newHeight > 0) {
			goBlockDetail(newHeight);
		}
	}, []);

	const goBlockDetail = React.useCallback(
		height => {
			history.replace(`/blocks/${height}`);
			setUrl(`/blocks/${height}`);
		},
		[history]
	);

	return (
		<div className={cx("Block")}>
			<BlockTitle height={height} onClick={getBlock} />
			<div className={cx("Card")}>
				<BlockHeader blockData={data.data} />
			</div>
		</div>
	);
}
