import {
	ORDER_CREATE_FAILURE,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_FAILURE,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_MINE_LIST_FAILURE,
	ORDER_MINE_LIST_REQUEST,
	ORDER_MINE_LIST_SUCCESS,
	ORDER_PAY_FAILURE,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS
} from '../constants/orderConstants';
import axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';

export const createOrder = (order) => async (dispatch, getState) => {
	dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
	try {
		const { userSignIn: { userInfo } } = getState();
		const { data } = await axios.post('/api/orders', order, {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		});
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
		dispatch({ type: CART_EMPTY });
		localStorage.removeItem('cartItems');
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAILURE,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

/****************************************************************************************************************************************************************/

export const detailsOrder = (orderId) => async (dispatch, getState) => {
	dispatch({
		type: ORDER_DETAILS_REQUEST,
		payload: orderId
	});

	const { userSignIn: { userInfo } } = getState();

	try {
		const { data } = await axios.get(`/api/orders/${orderId}`, {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});

		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;

		dispatch({
			type: ORDER_CREATE_FAILURE,
			payload: message
		});
	}
};

/*****************************************************************************************************************************************************************/

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
	dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
	const { userSignIn: { userInfo } } = getState();
	try {
		const { data } = axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: ORDER_PAY_FAILURE, payload: message });
	}
};

/*****************************************************************************************************************************************************************/

export const listOrderMine = () => async (dispatch, getState) => {
	dispatch({ type: ORDER_MINE_LIST_REQUEST });
	const { userSignIn: { userInfo } } = getState();
	try {
		const { data } = await axios.get('/api/orders/mine', {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		});
		dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: ORDER_MINE_LIST_FAILURE, payload: message });
	}
};

/*****************************************************************************************************************************************************************/

export const listorders = (orders) => async (dispatch, getState) => {
	dispatch({ type: ORDER_LIST_REQUEST, payload: orders });

	const { userSignIn: { userInfo } } = getState();

	try {
		const { data } = await axios.get('/api/orders', {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});

		dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: ORDER_LIST_FAILURE, payload: message });
	}
};
