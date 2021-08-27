import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
	try {
		const { data } = await axios.get(`/api/products/${productId}`);
		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				product: data._id,
				qty
			}
		});
	} catch (error) {
		console.log('cartActions: addToCart', error);
	}
	// console.log('getState: addToCart', getState());
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

/****************************************************************************************************************************************************************/

export const removeFromCart = (productId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CART_REMOVE_ITEM,
			payload: productId
		});
	} catch (error) {
		console.log('cardActions: removeFromCart', error);
	}

	// console.log('getState: removeFromCart', getState());
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

/********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

	if (!localStorage.shippingAddress) {
		localStorage.setItem('shippingAddress', JSON.stringify(data));
		console.log('works');
		window.location.reload();
	} else if (localStorage.shippingAddress) {
		localStorage.setItem('shippingAddress', JSON.stringify(data));
		window.location.reload();
		document.location.href = '/payment';
	}
};

/************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
