import React, { useState } from 'react';
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
import RegisterScreen from './screens/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import Badge from '@material-ui/core/Badge';
import { css, cx } from '@emotion/css';
import SignInScreen from './screens/SignInScreen';
import { signOut } from './redux/actions/userAction';
import Dropdown from './components/Dropdown';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreeen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

function App() {
	const [ state, setState ] = useState(false);
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const dispatch = useDispatch();
	const userSignIn = useSelector((state) => state.userSignIn);
	const { userInfo } = userSignIn;

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

	const signOutHandler = () => {
		console.log('sign out clicked');
		dispatch(signOut());
	};

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
								<Link to="/" className="brand">
									Thriftshop
								</Link>
							</Typography>
							<Box sx={{ flexGrow: 1 }} />
							{/* <Box sx={{ display: { xs: 'none', md: 'flex' } }} /> */}

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
							{userInfo ? (
								<Dropdown signOutHandler={signOutHandler} userInfo={userInfo} />
							) : (
								<Link to="/signin">Sign In</Link>
							)}
						</Toolbar>
					</MuiAppBar>

					<SwipeableDrawer open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
						<DrawerHeader />
						<Divider />
						{list()}
					</SwipeableDrawer>

					<Box id="main">
						<Switch>
							<Route path="/signin" component={SignInScreen} />
							<Route path="/register" component={RegisterScreen} />
							<Route path="/shipping" component={ShippingScreen} />
							<Route path="/payment" component={PaymentScreeen} />
							<Route path="/placeorder" component={PlaceOrderScreen} />
							<Route path="/cart/:id?" component={CartScreen} />
							<Route path="/product/:id" component={ProductScreen} />
							<Route path="/order/:id" component={OrderScreen} />
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
