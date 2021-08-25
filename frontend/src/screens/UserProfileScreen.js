import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, signIn, updateUserProfile } from '../redux/actions/userAction';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import {  USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstant';
import bcrypt from 'bcryptjs';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const UserProfileScreen = (props) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');

	const [ password, setPassword ] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ isError, setIsError ] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const dispatch = useDispatch();


  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

	useEffect(
		() => {
      if(!user) {
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(detailsUser(userInfo._id));
      }
      else {
        setName(user.name);
        setEmail(user.email)
      }
			
		},
		[ dispatch, userInfo._id, user]
	);

  const updateInfoHandler = (e) => {
    e.preventDefault();

    
   if(password !== confirmPassword) {
      setIsError(true);

    }
    else if(user.name === name) {
      setNameError(true)
    }
    else if(user.email === email) {
        setEmailError(true)
     
    }  

    else if(bcrypt.compare(password, user.password, (err, result) => {
      if(err) {
        console.log(err);
      }
      else if(result) {
        setPasswordError(true)
        console.log(true)
      }
      else  {
            dispatch(updateUserProfile({userId: user._id, name, email, password}))
      }
     
    }))
    {
    
      // setPasswordError(true)
    
    }



  };


  if(user) {
    console.log(user.password)
  console.log(password)
  }
  // console.log(user.password)
  // console.log(password)
	// console.log(userInfo.email);
  // console.log(email);
  // console.log(loading)
  // console.log(userDetails)
  // console.log(user)
  // console.log(loadingUpdate, errorUpdate, successUpdate)
  // console.log(userSignIn)

	return (
  <Box>
			<DrawerHeader />
			<form className="form" onSubmit={updateInfoHandler}>
				
				{loading ? <Loading /> : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
          
          <>
          {loadingUpdate && <Loading></Loading>}
          {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
          {successUpdate && <MessageBox variant="success">Successfully Updated Profile</MessageBox>}
       
          

          <div>
					<h1>User Profile</h1>
				</div>
          <div>
					<TextField
          error={nameError ? true : false}
						type="text"
						id="name"
						label="Enter Name"
						variant="filled"
						value={name}
						onChange={(e) => setName(e.target.value)}
            helperText={nameError ? 'Please set a new User name' : null}
					/>
				</div>
				<div>
					<TextField
          error={emailError ? true : false}
						type="email"
						id="email"
						label="Enter Email"
						variant="filled"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
            helperText={emailError ? 'Please set a new Email' : null}
					/>
				</div>
				<div>
					<TextField
          error={passwordError ? true : false}
						type="password"
						id="password"
						label="Enter Password"
						variant="filled"
						onChange={(e) => setPassword(e.target.value)}
            helperText={passwordError ? 'Please use a new Password' : null}
            
					/>
				</div>
				<div>
					<TextField
          			error={isError ? true : false}
						type="password"
						id="confirm-password"
						label="Confirm Password"
						variant="filled"
            
						onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={isError ? 'Password not matching' : null}
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
