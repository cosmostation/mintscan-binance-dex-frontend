import * as React from "react";
import cn from "classnames/bind";
import styles from "./Block.scss";
import {_} from "src/lib/scripts";

import consts from "src/constants/consts";
import {useFetch, usePrevious} from "src/hooks";

//  components
import ErrorPage from "src/components/common/ErrorPage";
import BlockTitle from "src/components/Block/BlockTitle";
import BlockHeader from "src/components/Block/BlockHeader";
import BlockTxs from "src/components/Block/BlockTxs";

const cx = cn.bind(styles);

const baseURL = `${consts.API_BASE}${consts.API.BLOCKLIST}?&limit=1`;
export default function(props) {
	const {history} = props;
	const {action} = history;
	const height = Number(props.match.params.height);
	const [state, refetch, setUrl] = useFetch(`${baseURL}&before=${Number(height) + 1}`);
	const [after, setAfter] = React.useState(false);

	const previousData = usePrevious(state.data);
	// console.count(history.action);

	React.useEffect(() => {
		// console.log(state.data?.paging?.before, previousData?.paging?.before);
		if (height <= 1 || isNaN(height)) {
			const newHeight = state.data?.data?.[0]?.height;
			if (!_.isNil(newHeight)) {
				history.replace(`/blocks/${newHeight}`);
			}
		}
		//  block navigation
		else if (!state.loading && state.data?.data?.[0]?.height && state.data?.data?.[0]?.height !== height) {
			if (after) {
				setAfter(false);
				history.replace(`/blocks/${state.data?.data?.[0]?.height}`);
				return;
			}
			if (action === "REPLACE") {
				setUrl(`${baseURL}&before=${Number(height) + 1}`);
			} else if (action === "POP" || action === "PUSH") {
				history.replace(`/blocks/${Number(height)}`);
				setUrl(`${baseURL}&before=${Number(height) + 1}`);
			}
		}
	}, [height, state.data]);

	React.useEffect(() => {
		if (!(state.data?.paging?.before && state.data?.paging?.before === previousData?.paging?.before)) return;
		setAfter(true);
		setUrl(`${baseURL}&after=${Number(height)}`);
	}, [state.data]);

	const getBlock = React.useCallback(
		isPrev => {
			const newHeight = isPrev ? state.data?.data?.[0]?.height - 1 : state.data?.data?.[0]?.height + 1;
			if (newHeight > 0) {
				goBlockDetail(newHeight);
			}
		},
		[state.data?.data?.[0]?.height]
	);

	const goBlockDetail = React.useCallback(
		height => {
			history.replace(`/blocks/${height}`);
			setUrl(`/blocks/${height}`);
		},
		[history]
	);
	if (state.error === true) return <ErrorPage />;

	const Content = React.useMemo(
		() => (
			<>
				<div className={cx("Card")}>
					<BlockHeader blockData={state.data?.data?.[0]} history={history} />
				</div>
				<div className={cx("Card")}>
					<BlockTxs txData={state.data?.data?.[0].txs} />
				</div>
			</>
		),
		[height, state.data?.data?.[0]?.height]
	);

	const Title = React.useMemo(() => <BlockTitle state={state} height={state.data?.data?.[0]?.height} onClick={getBlock} />, [
		state.loading,
		state.data?.data?.[0]?.height,
	]);

	return (
		<div className={cx("Block")}>
			{Title}
			{Content}
		</div>
	);
}
