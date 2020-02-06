import React from "react";
import {BrowserRouter} from "react-router-dom";
import {RestfulProvider} from "restful-react";

import App from "./App";

//  redux
import {Provider} from "react-redux";
import configure from "./store/configure";

import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

import variables from "./styles/utils.scss";

const store = configure();
const theme = createMuiTheme({
	palette: {
		primary: {
			main: variables.mainColor,
		},
		secondary: {
			main: "#f5f5f5",
		},
	},
	typography: {
		useNextVariants: true,
	},
	// xs, extra-small: 0px or larger
	// sm, small: 600px or larger
	// md, medium: 960px or larger
	// lg, large: 1280px or larger
	// xl, extra-large: 1920px or larger
});

const baseAPI = process.env.NODE_ENV === "production" ? new Error("add production api here") : "https://api-binance-testnet.cosmostation.io/";

export default function(props) {
	return (
		<MuiThemeProvider theme={theme}>
			<RestfulProvider base={baseAPI}>
				<Provider store={store}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>
			</RestfulProvider>
		</MuiThemeProvider>
	);
}
