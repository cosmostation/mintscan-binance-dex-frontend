import React from "react";

import "./App.scss";

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<p>Binance Explorer {process.env.REACT_APP_SITE_TITLE}</p>
			</header>
		</div>
	);
}

export default App;
