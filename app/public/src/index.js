import React from 'react';
import ReactDOM from "react-dom";
import { setConfig } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

import routes from './routes';

setConfig({
	ignoreSFC: true, // RHL will be __completely__ disabled for SFC
	pureRender: true // RHL will not change render method
});

const theme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	palette: {
		primary: {
			...lightBlue,
			contrastText: '#fff'
		}
	}
});

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
	</MuiThemeProvider>,
	document.querySelector('#app')
);
