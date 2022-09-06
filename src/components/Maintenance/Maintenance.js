import React from "react";
import bind from "classnames/bind";
import maintenanceSVG from "src/assets/misc/maintenance_img.svg";
import styles from "./Maintenance.scss";

const cx = bind.bind(styles);

export default function Maintenance({chain}) {
	return (
		<section className={cx("Maintenance-wrapper")}>
			<div className={cx("container")}>
				<div className={cx("system-wrap")}>
					<div className={cx("system-cont")}>
						<img src={maintenanceSVG} alt='maintenance' />
						<h1>
							Mintscan <span>{chain}</span> Explorer is Temporarily Down for Maintenance.
						</h1>
						<br />
						<p>
							We are performing scheduled maintenance for upgrades. Mintscan Explorer should be back online shortly.
							<br />
							Sorry for the inconvenience. <br />
							For any inquiries, please contact through our channels below. <br />
							<br />
							Telegram:{" "}
							<a href='https://t.me/cosmostation' target='_blank'>
								https://t.me/cosmostation
							</a>{" "}
							<br />
							KaKao:{" "}
							<a href='https://open.kakao.com/o/g6KKSe5' target='_blank'>
								https://open.kakao.com/o/g6KKSe5
							</a>
							<br />
							<br />
							We thank you for your patience!
							<br />
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
