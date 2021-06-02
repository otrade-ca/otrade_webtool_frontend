import {
	ROUTE_SAVE_RESET,
	ROUTE_SAVE_REQUEST,
} from '../constants/routeConstants';

// load one or more routes that have to be visited
export const routeSaveReducer = (state = { routeInfo: [] }, action) => {
	switch (action.type) {
		case ROUTE_SAVE_REQUEST:
			return { ...state, routeInfo: action.payload };
		case ROUTE_SAVE_RESET:
			return { routeInfo: [] };
		default:
			return state;
	}
};
