import React from "react";
import {BrowserRouter} from "react-router-dom";
import {RestfulProvider} from "restful-react"; //  Thank you Tejas

//  redux
import {Provider} from "react-redux";
import configure from "./store/configure";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

//  misc
import consts from "src/constants/consts";

//  app
import App from "./App";

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
	// xs, extra-small: 0px or larger
	// sm, small: 600px or larger
	// md, medium: 960px or larger
	// lg, large: 1280px or larger
	// xl, extra-large: 1920px or larger
});

export default function(props) {
	return (
		<MuiThemeProvider theme={theme}>
			<RestfulProvider base={consts.API_BASE()}>
				<Provider store={store}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>
			</RestfulProvider>
		</MuiThemeProvider>
	);
}
