import {
	ORDER_CREATE_FAILURE,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_RESET,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAILURE,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_MINE_LIST_FAILURE,
	ORDER_MINE_LIST_REQUEST,
	ORDER_MINE_LIST_SUCCESS,
	ORDER_PAY_FAILURE,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload };
		case ORDER_CREATE_FAILURE:
			return { loading: false, error: action.payload };
		case ORDER_CREATE_RESET:
			return {};

		default:
			return state;
	}
};

/****************************************************************************************************************************************************************/

export const orderDetailsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { loading: true };
		case ORDER_DETAILS_SUCCESS:
			return { loading: false, order: action.payload };
		case ORDER_DETAILS_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

/****************************************************************************************************************************************************************/

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return {
				...state,
				loading: true
			};

		case ORDER_PAY_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};

		case ORDER_PAY_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case ORDER_PAY_RESET:
			return {};

		default:
			return state;
	}
};

/****************************************************************************************************************************************************************/

export const orderMineListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_MINE_LIST_REQUEST:
			return { loading: true };
		case ORDER_MINE_LIST_SUCCESS:
			return { loading: false, orders: action.payload };
		case ORDER_MINE_LIST_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
