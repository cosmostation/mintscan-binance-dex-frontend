import React from "react";
import {BrowserRouter} from "react-router-dom";
import {RestfulProvider} from "restful-react"; //  Thank you Tejas - I'm not gonna lie, swr looks more juicy these days
import consts from "src/constants/consts";
import App from "./App";
//  comment this out if you do not plan on using firebase
// import "./firebase";
//  redux
import {Provider} from "react-redux";
import configure from "./store/configure";
//  Mui
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";

const store = configure();
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#f0b90b",
		},
		secondary: {
			main: "#f5f5f5",
		},
	},
	typography: {
		useNextVariants: true,
	},
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: "0.8em",
			},
		},
	},
	// xs, extra-small: 0px or larger
	// sm, small: 600px or larger
	// md, medium: 960px or larger
	// lg, large: 1280px or larger
	// xl, extra-large: 1920px or larger
});

export default function(props) {
	return (
		<MuiThemeProvider theme={theme}>
			<RestfulProvider base={consts.API_BASE}>
				<Provider store={store}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>
			</RestfulProvider>
		</MuiThemeProvider>
	);
}
