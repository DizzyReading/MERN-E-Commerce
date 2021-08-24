import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, signIn } from '../redux/actions/userAction';
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

const UserProfileScreen = (props) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

	const userSignIn = useSelector((state) => state.userSignIn);
	const { userInfo } = userSignIn;

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(detailsUser(userInfo._id));
		},
		[ dispatch, userInfo._id ]
	);

	const updateInfoHandler = (e) => {
		e.preventDefault();
		//TODO: Dispatch updateProfile Action
	};

	// console.log(userInfo.name);
  // console.log(loading)
  // console.log(userDetails)
  console.log(user)

	return (
		<Box>
			<DrawerHeader />
			<form className="form" onSubmit={updateInfoHandler}>
				
				{loading ? <Loading /> : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
          
          <>
          <div>
					<h1>User Profile</h1>
				</div>
          <div>
					<TextField
						type="text"
						id="name"
						label="Enter Name"
						variant="filled"
						value={user.name}
						// onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						type="email"
						id="email"
						label="Enter Email"
						variant="filled"
						value={user.email}
						// onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						type="password"
						id="password"
						label="Enter Password"
						variant="filled"

						// onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						type="confirm-password"
						id="password"
						label="Confirm Password"
						variant="filled"

						// onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<label />
					<Button variant="contained" color="primary" type="submit">
						Update
					</Button>
				</div>
				<div>
					<label />
				</div>
          </>
        )}
				
			</form>
		</Box>
	);
};

export default UserProfileScreen;
