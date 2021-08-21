import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/userAction';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { css, cx } from '@emotion/css';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const RegisterScreen = (props) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ isError, setIsError ] = useState(false);

	const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, loading, error } = userRegister;
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setIsError(true);
		} else {
			dispatch(register(name, email, password));
		}
	};

	useEffect(
		() => {
			if (userInfo) props.history.push(redirect);
		},
		[ props.history, redirect, userInfo ]
	);

	console.log('RegisterScreen:', props.location.search.split('=')[1]);

	return (
		<Box>
			<DrawerHeader />
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Register</h1>
				</div>

				{error && <MessageBox variant="danger">{error}</MessageBox>}

				<div>
					<TextField
						type="text"
						id="name"
						label="Name"
						variant="filled"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

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
					<TextField
						error={isError ? true : false}
						type="password"
						id="confirm-password"
						label="Confirm Password"
						helperText={isError ? 'Password not matching' : null}
						variant="filled"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div>
					<label />
					<Button variant="contained" color="primary" type="submit">
						Register
					</Button>
				</div>
				<div>
					<label />
					<div>
						Already have an account?{' '}
						<Link
							to={`/signin?redirect=${redirect}`}
							className={css`
								color: #2196f3;
								&:hover {
									color: #1976d2;
								}
							`}
						>
							Sign in.
						</Link>
					</div>
				</div>
			</form>
		</Box>
	);
};

export default RegisterScreen;
