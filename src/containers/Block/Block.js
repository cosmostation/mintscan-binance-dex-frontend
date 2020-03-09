import * as React from "react";
import cn from "classnames/bind";
import styles from "./Block.scss";
import {_} from "src/lib/scripts";

import consts from "src/constants/consts";
import useFetch from "src/hooks/useFetch/useFetch";

//  components
import ErrorPage from "src/components/common/ErrorPage";
import BlockTitle from "src/components/Block/BlockTitle";
import BlockHeader from "src/components/Block/BlockHeader";
import BlockTxs from "src/components/Block/BlockTxs";

const cx = cn.bind(styles);

const baseURL = `${consts.API_BASE}${consts.API.BLOCKLIST}?&limit=1`;
export default function(props) {
	const {history} = props;
	const height = Number(props.match.params.height);
	const [data, refetch, setUrl] = useFetch(`${baseURL}&before=${Number(height) + 1}`);
	React.useEffect(() => {
		if (height < 1 || isNaN(height)) {
			const height = data.data?.data?.[0]?.height;
			if (!_.isNil(height)) {
				history.replace(`/blocks/${height}`);
			}
		} else if (data.data?.data?.[0]?.height && height !== data.data?.data?.[0]?.height) {
			history.replace(`/blocks/${data.data?.data?.[0]?.height}`);
		}
		//  block navigation
		else if (data.data?.data?.[0]?.height !== height) {
			setUrl(`${baseURL}&before=${Number(height) + 1}`);
		}
	}, [height, data.data]);

	const getBlock = React.useCallback(
		isPrev => {
			const newHeight = isPrev ? Number(height) - 1 : Number(height) + 1;
			if (newHeight > 0) {
				goBlockDetail(newHeight);
			}
		},
		[height]
	);

	const goBlockDetail = React.useCallback(
		height => {
			history.replace(`/blocks/${height}`);
			setUrl(`/blocks/${height}`);
		},
		[history]
	);
	if (data.error === true) return <ErrorPage />;
	return (
		<div className={cx("Block")}>
			<BlockTitle height={height} onClick={getBlock} />
			<div className={cx("Card")}>
				<BlockHeader blockData={data.data?.data?.[0]} history={history} />
			</div>
			<div className={cx("Card")}>
				<BlockTxs txData={data.data?.data?.[0].txs} />
			</div>
		</div>
	);
}
