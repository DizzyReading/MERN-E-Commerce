import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/actions/userAction';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const SignInScreen = (props) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

	const userSignIn = useSelector((state) => state.userSignIn);
	const { userInfo, loading, error } = userSignIn;
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (userInfo) {
				props.history.push(redirect);
			}
		},
		[ props.history, redirect, userInfo ]
	);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(signIn(email, password));
	};

	console.log('SignInScreen:', props.location.search.split('=')[1]);
	console.log('Redirect', redirect);
	return (
		<Box>
			<DrawerHeader />
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Sign In</h1>
				</div>
				{error && <MessageBox variant="danger">{error}</MessageBox>}
				<div>
					<TextField
						type="email"
						id="email"
						label="Email"
						variant="filled"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						type="password"
						id="password"
						label="Password"
						variant="filled"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<label />
					<Button variant="contained" color="primary" type="submit">
						Sign In
					</Button>
				</div>
				<div>
					<label />
					<div>
						New customer?
						<Link
							to={`/register?redirect=${redirect}`}
							className={css`
								color: #2196f3;
								&:hover {
									color: #1976d2;
								}
							`}
						>
							Create an account.
						</Link>
					</div>
				</div>
			</form>
		</Box>
	);
};

export default SignInScreen;
