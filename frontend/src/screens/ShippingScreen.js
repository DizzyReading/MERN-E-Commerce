import CheckOutStepper from '../components/CheckOutStepper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { css, cx } from '@emotion/css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/actions/cartActions';

const ShippingScreen = (props) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const dispatch = useDispatch();

	const [ fullName, setFullName ] = useState(shippingAddress.fullName);
	const [ address, setAddress ] = useState(shippingAddress.address);
	const [ city, setCity ] = useState(shippingAddress.city);
	const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
	const [ state, setState ] = useState(shippingAddress.state);

	const userSignIn = useSelector((state) => state.userSignIn);
	const { userInfo } = userSignIn;

	if (!userInfo) {
		props.history.push('/signin');
	}

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(saveShippingAddress({ fullName, address, city, postalCode, state }));

		props.history.push('/payment');
	};

	// console.log(redirect);

	return (
		<div>
			<CheckOutStepper step={1} />
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h2
						className={css`
							margin: 0;
							text-align: center;
						`}
					>
						Shipping Address
					</h2>
				</div>

				<div>
					<TextField
						type="text"
						id="full-name"
						label="Full Name"
						value={fullName}
						variant="filled"
						onChange={(e) => setFullName(e.target.value)}
						required
					/>
				</div>

				<div>
					<TextField
						type="text"
						id="address"
						label="Address"
						value={address}
						variant="filled"
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						type="text"
						id="city"
						label="City"
						value={city}
						variant="filled"
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						type="text"
						id="postal-code"
						label="Postal Code"
						value={postalCode}
						variant="filled"
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						type="text"
						id="state"
						label="State"
						value={state}
						variant="filled"
						onChange={(e) => setState(e.target.value)}
					/>
				</div>
				<div>
					<label />
					<Button variant="contained" color="primary" type="submit">
						Continue
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ShippingScreen;
