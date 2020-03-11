/*
 * WARNING
 * the code here deliberately contains missing dependencies in hooks(probably)
 * it is highly likely that A LOT of refactoring will be needed if attempted to fix.
 * You have been warned
 */
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
	const height = Number(props.match.params.height);
	const [state, , setUrl] = useFetch(`${baseURL}&before=${Number(height) + 1}`);
	const queriedHeight = state.data?.data?.[0]?.height;
	const [after, setAfter] = React.useState(false);

	const previousData = usePrevious(state.data);
	// console.count(history.action);

	React.useEffect(() => {
		const {action} = history;
		if (height <= 1 || isNaN(height)) {
			const newHeight = queriedHeight;
			if (!_.isNil(newHeight)) {
				history.replace(`/blocks/${newHeight}`);
			}
		}
		//  block navigation
		else if (!state.loading && queriedHeight && queriedHeight !== height) {
			if (after) {
				setAfter(false);
				history.replace(`/blocks/${queriedHeight}`);
				return;
			}
			if (action === "REPLACE") {
				setUrl(`${baseURL}&before=${Number(height) + 1}`);
			} else if (action === "POP" || action === "PUSH") {
				history.replace(`/blocks/${Number(height)}`);
				setUrl(`${baseURL}&before=${Number(height) + 1}`);
			}
		}
		// eslint-disable-next-line
	}, [height, state.data, history, setUrl]);

	//  query after if current data is same as before
	React.useEffect(() => {
		if (!(state.data?.paging?.before && state.data?.paging?.before === previousData?.paging?.before)) return;
		setAfter(true);
		setUrl(`${baseURL}&after=${Number(height)}`);
		// eslint-disable-next-line
	}, [state.data, setUrl]);

	const goBlockDetail = React.useCallback(
		height => {
			history.replace(`/blocks/${height}`);
			setUrl(`/blocks/${height}`);
		},
		[history, setUrl]
	);

	const getBlock = React.useCallback(
		isPrev => {
			const newHeight = isPrev ? queriedHeight - 1 : queriedHeight + 1;
			if (newHeight > 0) {
				goBlockDetail(newHeight);
			}
		},
		[queriedHeight, goBlockDetail]
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
		[history, state.data]
	);

	const Title = React.useMemo(() => <BlockTitle loading={state.loading} height={queriedHeight} onClick={getBlock} />, [state.loading, queriedHeight, getBlock]);

	return (
		<div className={cx("Block")}>
			{Title}
			{Content}
		</div>
	);
}
