import * as React from "react";
import cn from "classnames/bind";
import styles from "./TxDisplay.scss";
//  utils
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import {useFetch, useTimer} from "src/hooks";
//  components
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import ErrorPage from "src/components/common/ErrorPage";
import TableWrapper from "src/components/Dashboard/TableWrapper";
import TxDisplayTableRow from "./TableRow";

const cx = cn.bind(styles);

export default function(props) {
	const [data, requestFetch] = useFetch(`${consts.API_BASE}${consts.API.TXLIST}?limit=5`, "get");

	const [watching] = useTimer(true, consts.NUM.DASH_REAL_TIME_DELAY_MS);

	React.useEffect(() => {
		requestFetch();
	}, [watching, requestFetch]);

	const tableHeaderRender = React.useMemo(
		() => (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell", "txHashWidth")} align='left'>
						<span>Tx hash</span>
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "typeWidth")} align='left'>
						Type
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "height")} align='right'>
						Height
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "timeWidth")} align='right'>
						<span>Time</span>
					</TableCell>
				</TableRow>
			</TableHead>
		),
		[]
	);

	const tableBodyRender = React.useMemo(
		() => (
			<TableBody>
				{_.map(data?.data?.data, (v, i) => (
					<TxDisplayTableRow key={i} blockData={v} />
				))}
			</TableBody>
		),
		[data]
	);

	return React.useMemo(
		() => (
			<TableWrapper title={"TRANSACTIONS"} type={2}>
				{data.error ? (
					<ErrorPage />
				) : (
					<Table className={cx("TxDisplay-table")}>
						{tableHeaderRender}
						{tableBodyRender}
					</Table>
				)}
			</TableWrapper>
		),
		[data.error, tableHeaderRender, tableBodyRender]
	);
}
