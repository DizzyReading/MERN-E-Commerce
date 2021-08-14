import React from 'react';

import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { HiOutlineMenu } from 'react-icons/hi';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import PageNotFound from './components/404';
import CartScreen from './screens/CartScreen';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import Badge from '@material-ui/core/Badge';
import { css, cx } from '@emotion/css';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

function App() {
	const [ state, setState ] = React.useState(false);
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const toggleDrawer = (open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState(open);
	};

	const list = () => (
		<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
			<List>
				{[ 'Inbox', 'Starred', 'Send email', 'Drafts' ].map((text, index) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Router>
			<div className="App">
				<Box>
					<CssBaseline />
					<MuiAppBar>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={toggleDrawer(true)}
								edge="start"
							>
								<HiOutlineMenu />
							</IconButton>

							<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
								<Link to="/" className="brand" sx={{ flexGrow: 1 }}>
									Thriftstore
								</Link>
							</Typography>
							<Link to="/cart">
								<Badge badgeContent={cartItems.length > 0 ? cartItems.length : 0} color={'error'}>
									<FaShoppingCart
										className={css`
											height: 1.5em;
											width: 1.5em;
										`}
									/>
								</Badge>
							</Link>
							<Link to="/signin">Sign In</Link>
						</Toolbar>
					</MuiAppBar>

					<SwipeableDrawer open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
						<DrawerHeader />
						<Divider />
						{list()}
					</SwipeableDrawer>

					<Box id="main">
						<Switch>
							<Route path="/cart/:id?" component={CartScreen} />
							<Route path="/product/:id" component={ProductScreen} />
							<Route path="/" component={HomeScreen} exact />
							<Route path="*">
								<PageNotFound />
							</Route>
						</Switch>
					</Box>
				</Box>
			</div>
		</Router>
	);
}

export default App;
