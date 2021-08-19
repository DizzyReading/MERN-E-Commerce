import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { NativeSelect, FormControl } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { css, cx } from '@emotion/css';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		padding: '1rem'
	},
	media: {
		height: 200
	}
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const CartScreen = (props) => {
	const classes = useStyles();

	const productId = props.match.params.id;
	const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

	const cart = useSelector((state) => state.cart);
	const { cartItems, error } = cart;
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (productId) {
				dispatch(addToCart(productId, qty));
			}
		},
		[ dispatch, productId, qty ]
	);

	const removeFromCartHandler = (id) => {
		// delete action
		dispatch(removeFromCart(id));
	};

	const checkOutHandler = () => {
		props.history.push('/signin?redirect=shipping');
	};

	// console.log('Cart Screen', props);
	return (
		<Box>
			<DrawerHeader />
			<div className="row top">
				<div className="col-2">
					<h1>Shopping Cart</h1>
					{error && <MessageBox variant="danger">{error}</MessageBox>}
					{cartItems.length === 0 ? (
						<MessageBox>
							Cart is empty.
							<Link
								to="/"
								className={css`
									color: #ed4824;
									&:hover {
										color: #ffffff;
									}
								`}
							>
								Go Shopping!
							</Link>
						</MessageBox>
					) : (
						<ul>
							{cartItems.map((item) => (
								<li key={item.product}>
									<div className="row-2">
										<div>
											<img src={item.image} alt={item.name} className="small" />
										</div>
										<div className="min-30">
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</div>

										<FormControl>
											<NativeSelect
												value={item.qty}
												onChange={(e) =>
													dispatch(addToCart(item.product, Number(e.target.value)))}
											>
												{[ ...Array(item.countInStock).keys() ].map((el) => (
													<option key={el + 1} value={el + 1}>
														{el + 1}
													</option>
												))}
											</NativeSelect>
										</FormControl>

										<div>${item.price}</div>
										<div>
											<Button
												variant="contained"
												color="primary"
												onClick={() => removeFromCartHandler(item.product)} // <-- here item.product is id
												sx={{ marginLeft: '8px' }}
											>
												Delete
											</Button>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="card">
					<Card className={(classes.root, classes.media)}>
						<CardContent>
							<ul>
								<li>
									<h2 className="subtotal">
										Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
										{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
									</h2>
								</li>
								<li className={css`text-align: center;`}>
									<Button
										variant="contained"
										color="primary"
										onClick={checkOutHandler}
										disabled={cartItems.length === 0}
									>
										Proceed to Checkout
									</Button>
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</Box>
	);
};

export default CartScreen;
