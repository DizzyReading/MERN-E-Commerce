import {
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_SIGNIN_FAILURE,
	USER_SIGNOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE
} from '../constants/userConstant';
import axios from 'axios';

export const register = (name, email, password) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
	try {
		const { data } = await axios.post('/api/users/register', {
			name,
			email,
			password
		});
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAILURE,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

/************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

export const signIn = (email, password) => async (dispatch) => {
	dispatch({
		type: USER_SIGNIN_REQUEST,
		payload: { email, password }
	});

	try {
		const { data } = await axios.post('/api/users/signin', { email, password });

		dispatch({
			type: USER_SIGNIN_SUCCESS,
			payload: data
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: USER_SIGNIN_FAILURE,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message
		});
	}
};

/************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

export const signOut = () => (dispatch) => {
	localStorage.removeItem('userInfo');
	localStorage.removeItem('cartItems');
	localStorage.removeItem('shippingAddress');
	dispatch({
		type: USER_SIGNOUT
	});
	// localStorage.clear();
	document.location.href = '/signin';
	// document.location.href = '#signin';
};
