import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#00695f'
		},
		secondary: {
			main: '#fff'
		}
	},

	typography: {
		fontFamily: 'PT Sans',
		button: {
			textTransform: 'none',
			fontFamily: 'PT Sans'
		}
	}
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Provider>
	</ThemeProvider>,
	document.getElementById('root')
);
