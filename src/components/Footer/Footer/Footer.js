/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useMemo} from "react";
import styles from "./Footer.scss";
import classNames from "classnames/bind";
import consts from "src/constants/consts";

import footerLogo from "src/assets/footer/mintscan_footer_logo.svg";
import googleIcon from "src/assets/footer/playstore_btn.svg";
import iosIcon from "src/assets/footer/appstore_btn.svg";
import webWalletIcon from "src/assets/footer/wallet_btn.svg";
import githubIcon from "src/assets/footer/github_btn.svg";
import mediumIcon from "src/assets/footer/medium_btn.svg";
import telegramIcon from "src/assets/footer/telegram_btn.svg";
import emailIcon from "src/assets/footer/email_btn.svg";

const cx = classNames.bind(styles);

export default function(props) {
	const render = (
		<footer className={cx("footerWrapper")}>
			<div className={cx("footer")}>
				<div className={cx("footer-left")}>
					<a>
						<img src={footerLogo} alt='cosmostation_logo' />
					</a>
					<div className={cx("wallet-link-wrapper")}>
						<p className={cx("title")}>Download Cosmostation Wallet</p>
						<div className={cx("btn-wrapper")}>
							<a href={consts.LINK.GOOGLE} target='_blank' rel='noopener noreferrer'>
								<div className={cx("wallet-link-btn")}>
									<img src={googleIcon} alt='playstore' />
								</div>
							</a>
							<a href={consts.LINK.IOS} target='_blank' rel='noopener noreferrer'>
								<div className={cx("wallet-link-btn")}>
									<img src={iosIcon} alt='appstore' />
								</div>
							</a>
							<a href={consts.LINK.IOS} target='_blank' rel='noopener noreferrer'>
								<div className={cx("wallet-link-btn", "web")}>
									<img className={cx("web-icon")} src={webWalletIcon} alt='webwallet' />
									<span className={cx("web-title")}>Web Wallet</span>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div className={cx("footer-right")}>
					<ul className={cx("social")}>
						<li>
							<a rel='noopener noreferrer' href='https://github.com/cosmostation' id='github' title='Github' target='_blank'>
								<img src={githubIcon} alt='github' />
							</a>
						</li>
						<li>
							<a rel='noopener noreferrer' href='https://medium.com/cosmostation' id='medium' title='Medium' target='_blank'>
								<img src={mediumIcon} alt='medium' />
							</a>
						</li>
						<li>
							<a rel='noopener noreferrer' href='https://t.me/cosmostation' id='telegram' title='Telegram' target='_blank'>
								<img src={telegramIcon} alt='telegram' />
							</a>
						</li>
						<li>
							<a rel='noopener noreferrer' href='mailto:support@cosmostation.io' id='mail' title='Mail' target='_blank'>
								<img src={emailIcon} alt='email' />
							</a>
						</li>
					</ul>
					<div className={cx("rights")}>
						<div className={cx("footer-copyright")} onClick={e => window.open(consts.LINK.COSMOSTATION)}>
							© CØSMOSTATION 2020
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
	return useMemo(() => render, [render]);
}
