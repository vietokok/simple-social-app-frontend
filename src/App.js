import { Box, CircularProgress } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Homepage from 'features/Users/pages/HomePage';
import SignUp from 'features/Users/pages/Signup';
import 'fontsource-roboto';
import { Suspense, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from 'utils/PrivateRoute';
import PublicRoute from 'utils/PublicRoute';
import './App.css';
import SignIn from './features/Users/pages/SignIn';

function App() {
	const [darkMode, setDarkMode] = useState(false);

	const theme = createMuiTheme({
		palette: {
			secondary: red,
			type: darkMode ? 'dark' : 'light',
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Box className='App'>
				<Suspense fallback={<CircularProgress />}>
					<BrowserRouter>
						<Switch>
							<PrivateRoute component={Homepage} path='/' exact />
							<PublicRoute
								restricted={true}
								component={SignIn}
								path='/signin'
								exact
							/>
							<PublicRoute
								restricted={true}
								component={SignUp}
								path='/signup'
								exact
							/>
						</Switch>
					</BrowserRouter>
				</Suspense>
			</Box>
		</ThemeProvider>
	);
}

export default App;
