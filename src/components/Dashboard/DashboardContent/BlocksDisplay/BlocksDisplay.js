import * as React from "react";
import cn from "classnames/bind";
import styles from "./BlocksDisplay.scss";
//  utils
import {useFetch, useTimer} from "src/hooks";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
//  components
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import ErrorPage from "src/components/common/ErrorPage";
import TableWrapper from "src/components/Dashboard/TableWrapper";
import BlockDisplayTableRow from "./TableRow";

const cx = cn.bind(styles);

export default function(props) {
	const [data, requestFetch] = useFetch(`${consts.API_BASE}${consts.API.BLOCKLIST}?limit=5`, "get");
	const [watching] = useTimer(true, consts.NUM.DASH_REAL_TIME_DELAY_MS);

	React.useEffect(() => {
		requestFetch();
	}, [watching, requestFetch]);

	const tableHeaderRender = React.useMemo(() => {
		return (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell", "heightWidth")} align='left'>
						<span>Height</span>
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "proposer")} align='left'>
						Proposer
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						Txs
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "timeWidth")} align='right'>
						<span>Time</span>
					</TableCell>
				</TableRow>
			</TableHead>
		);
	}, []);
	const tableBodyRender = React.useMemo(
		() => (
			<>
				{_.map(data?.data?.data, (v, i) => (
					<BlockDisplayTableRow key={i} blockData={v} />
				))}
			</>
		),
		[data]
	);

	return React.useMemo(
		() => (
			<TableWrapper title={"BLOCKS"} type={1}>
				{data.error ? (
					<ErrorPage />
				) : (
					<Table className={cx("BlocksDisplay-table")}>
						{tableHeaderRender}
						<TableBody>{tableBodyRender}</TableBody>
					</Table>
				)}
			</TableWrapper>
		),
		[data.error, tableHeaderRender, tableBodyRender]
	);
}
