import React, {lazy, Suspense} from "react";
import cn from "classnames/bind";
import {Route, Switch} from "react-router-dom";
import styles from "./Router.scss";
//  component
import Loading from "src/components/common/Loading";
//  hooks
import {useHistory, usePreload} from "src/hooks";
import ReactGA from "react-ga";

const cx = cn.bind(styles);

const Block = lazy(() => import(`src/containers/Block`));
const BlockList = lazy(() => import(`src/containers/BlockList`));
const Dashboard = lazy(() => import(`src/containers/Dashboard`));
const TxList = lazy(() => import(`src/containers/TxList`));
const AssetList = lazy(() => import(`src/containers/AssetList`));
const Tx = lazy(() => import(`src/containers/Tx`));
const NotFound = lazy(() => import(`src/containers/NotFound`));
const Account = lazy(() => import(`src/containers/Account`));
const Asset = lazy(() => import(`src/containers/Asset`));

export default function(props) {
	//  preload stuff that needs preloading
	usePreload();
	console.log("router rerender >>> should never happen");
	return (
		<main className={cx("routerContainer")}>
			<Suspense fallback={<Loading />}>
				<ScrollToTop>
					<Switch>
						<Route exact path='/' render={props => <Dashboard {...props} />} />
						<Route path='/blocks/:height' render={props => <Block {...props} />} />
						<Route path='/blocks' render={props => <BlockList {...props} />} />
						<Route path='/txs/:tx' render={props => <Tx {...props} />} />
						<Route path='/txs' render={props => <TxList {...props} />} />
						<Route path='/account/:account' render={props => <Account {...props} />} />
						<Route path='/assets/:asset' render={props => <Asset {...props} />} />
						<Route path='/assets' render={props => <AssetList {...props} />} />
						<Route render={() => <NotFound />} />
					</Switch>
				</ScrollToTop>
			</Suspense>
		</main>
	);
}

const ScrollToTop = props => {
	const history = useHistory();
	React.useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
		window.scrollTo(0, 0);
	}, [history.location.pathname]);
	return <>{props.children}</>;
};
