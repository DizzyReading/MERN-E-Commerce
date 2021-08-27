import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../redux/actions/userAction';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../redux/constants/userConstant';
import bcrypt from 'bcryptjs';
import Checkbox from '@material-ui/core/Checkbox';
import swal from 'sweetalert';

import FormControlLabel from '@material-ui/core/FormControlLabel';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const UserEditScreen = (props) => {
	const userId = props.match.params.id;
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ isAdmin, setIsAdmin ] = useState(false);
	const [ isSeller, setIsSeller ] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

	useEffect(
		() => {
			if (successUpdate) {
				dispatch({ type: USER_UPDATE_RESET });
				props.history.push('/userlist');
			}
			if (!user) {
				dispatch(detailsUser(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsSeller(user.isSeller);
				setIsAdmin(user.isAdmin);
			}
		},
		[ dispatch, user, userId, successUpdate, props.history ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		//TODO: Dispatch updateUser
		dispatch(updateUser({ _id: userId, email, name, isSeller, isAdmin }));
	};

	successUpdate ? swal('Success!', '', 'success') : console.log(null);

	console.log(user);

	return (
		<Box>
			<DrawerHeader />

			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Edit User</h1>
					{loadingUpdate && <Loading />}
					{errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
					{/* {successUpdate && <MessageBox variant="success">{successUpdate}</MessageBox>} */}
				</div>
				<div>
					<TextField
						// error={nameError ? true : false}
						type="text"
						id="name"
						label="Enter Name"
						variant="filled"
						value={name}
						onChange={(e) => setName(e.target.value)}
						// helperText={nameError ? 'Please set a new User name' : null}
					/>
				</div>
				<div>
					<TextField
						// error={emailError ? true : false}
						type="email"
						id="email"
						label="Enter Email"
						variant="filled"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						// helperText={emailError ? 'Please set a new Email' : null}
					/>
				</div>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								checked={isSeller}
								onChange={(e) => setIsSeller(e.target.checked)}
								name="is Seller"
							/>
						}
						label="is Seller"
					/>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
								name="is Admin"
							/>
						}
						label="is Admin"
					/>
				</FormGroup>
				<div>
					<label />
					<Button variant="contained" color="primary" type="submit">
						Update
					</Button>
				</div>
				<div>
					<label />
				</div>
			</form>
		</Box>
	);
};

export default UserEditScreen;
