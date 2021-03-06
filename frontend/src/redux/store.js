import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userRegisterReducer,
	userSignInReducer,
	userUpdateProfileReducer,
	userUpdateReducer
} from './reducers/userReducer';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderListReducer,
	orderMineListReducer,
	orderPayReducer
} from './reducers/orderReducer';

const initialState = {
	userRegister: {
		userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
	},

	userSignIn: {
		userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
	},

	cart: {
		cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
		shippingAddress: localStorage.getItem('shippingAddress')
			? JSON.parse(localStorage.getItem('shippingAddress'))
			: {}
	},
	paymentMethod: 'PayPal'
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignIn: userSignInReducer,
	userRegister: userRegisterReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderMineList: orderMineListReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	orderList: orderListReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
