import * as React from "react";
import cn from "classnames/bind";
import styles from "./BlocksDisplay.scss";

//  utils
import consts from "src/constants/consts";
import {empty, formatNumber} from "src/lib/scripts";
import useFetch from "src/hooks/useFetch/useFetch";
//  components
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import ErrorPage from "src/components/common/ErrorPage";
import TableWrapper from "src/components/Dashboard/TableWrapper";

const cx = cn.bind(styles);

const baseURL = consts.API_BASE();
const url = `${consts.API.BLOCKLIST}?limit=5`;

export default function(props) {
	const [data, requestFetch, setUrl] = useFetch(`${baseURL}${url}`, "get");

	const tableHeaderRender = React.useMemo(() => {
		return (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell", "heightWidth")} align='left'>
						<span>Height</span>
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "proposerWidth")} align='left'>
						Proposer
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "middleWidth")} align='right'>
						Txs
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "timeWidth")} align='right'>
						<span>Time</span>
					</TableCell>
				</TableRow>
			</TableHead>
		);
	}, [data.data]);
	const tableBodyRender = React.useMemo(() => <TableBody></TableBody>, []);

	return (
		<TableWrapper title={"BLOCKS"} type={1}>
			{data.error ? <ErrorPage /> : <Table className={cx("table")}>{tableHeaderRender}</Table>}
		</TableWrapper>
	);
}
