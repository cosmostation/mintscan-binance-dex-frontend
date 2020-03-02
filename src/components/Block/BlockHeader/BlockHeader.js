import * as React from "react";
import cn from "classnames/bind";
import styles from "./BlockHeader.scss";
import {NavLink} from "react-router-dom";

import {setAgoTime, totalTime, _, formatNumber} from "src/lib/scripts";
//  components
import InfoRow from "src/components/common/InfoRow";
import Skeleton from "react-skeleton-loader";

const cx = cn.bind(styles);

export default function({blockData, history}) {
	// TODO
	//  apply proper fee when applicable
	const fee = "0.000000";
	const split = fee.split(".");

	return React.useMemo(
		() => (
			<div className={cx("BlockDetail-wrapper")}>
				{(() => console.table(blockData))()}
				<div className={cx("title")}>Block Data</div>
				<div className={cx("content")}>
					<InfoRow label={"Height"}>{blockData?.height}</InfoRow>
					<InfoRow label={"Block Time"}>
						{_.isNil(blockData?.timestamp) ? <Skeleton /> : `${setAgoTime(blockData?.timestamp)} (${totalTime(blockData?.timestamp)})`}
					</InfoRow>
					<InfoRow label={"Block Hash"}>{blockData?.block_hash}</InfoRow>
					<InfoRow label={"Parent Hash"}>
						<span className={cx("blueLink")} onClick={() => history.replace(`/blocks/${Number(blockData?.height) - 1}`)}>
							{blockData?.parent_hash}
						</span>
					</InfoRow>
					<InfoRow label={"Number of Tx"}>{blockData?.txs.length}</InfoRow>
					<InfoRow label={"Node"}>{blockData?.moniker}</InfoRow>
					<div className={cx("rewardRow")}>
						<div className={cx("row-label")}>RewardedTo / Fee</div>
						<div className={cx("row-content")}>
							<ul className={cx("label-wrapper")}>
								<li>RewardTo</li>
								<li>Fee</li>
							</ul>
							<ul className={cx("value-wrapper")}>
								<li>
									<NavLink className={cx("blueLink")} to={"/address/bnb16k0gajcczwgymfkk0zsysjzl0sxyxdfckplxlr"}>
										bnb16k0gajcczwgymfkk0zsysjzl0sxyxdfckplxlr
									</NavLink>
									- 고정값
								</li>
								<li>
									<span>{formatNumber(split[0])}</span>.<span className={cx("text", "decimal")}>{split[1]}</span> <span className={cx("BNB")}>BNB</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		),
		[blockData]
	);
}
