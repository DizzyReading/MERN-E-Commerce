import { styled } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { css, cx } from '@emotion/css';
import CheckOutStepper from '../components/CheckOutStepper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../redux/actions/cartActions';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const PaymentScreeen = (props) => {
	const [ paymentMethod, setPaymentMethod ] = useState('PayPal');
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress.address) {
		props.history.push('/shipping');
	}

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		console.log('Submit Handle Clicked');
		e.preventDefault();

		dispatch(savePaymentMethod(paymentMethod));
		props.history.push('/placeorder');
	};

	return (
		<div>
			<CheckOutStepper step={2} />
			<DrawerHeader />
			<div
				className={css`
					display: flex;
					text-align: center;
				`}
			>
				<form className="form" onSubmit={submitHandler}>
					<FormLabel component="legend">Payment Method</FormLabel>
					<RadioGroup aria-label="payment" defaultValue="PayPal" name="radio-buttons-group">
						<FormControlLabel
							value="PayPal"
							control={<Radio color="primary" />}
							label="PayPal"
							required
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
						<FormControlLabel
							value="Stripe"
							control={<Radio color="primary" />}
							label="Stripe"
							required
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
					</RadioGroup>
					<div>
						<Button variant="contained" color="primary" type="submit">
							Continue
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PaymentScreeen;
