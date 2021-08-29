import {
	ROUTE_SAVE_RESET,
	ROUTE_SAVE_REQUEST,
	BREADCRUMB_SAVE_REQUEST,
	BREADCRUMB_SAVE_RESET,
} from '../constants/routeConstants';

/**
 * load one or more routes that have to be visited
 * @param {*} state
 * @param {*} action
 * @returns
 */
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

/**
 * saves one or more breadcrumbs to allow the user to navigate
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const breadCrumbSaveReducer = (state = { breadcrumbs: [] }, action) => {
	switch (action.type) {
		case BREADCRUMB_SAVE_REQUEST:
			return { ...state, breadcrumbs: action.payload };
		case BREADCRUMB_SAVE_RESET:
			return { breadcrumbs: [] };
		default:
			return state;
	}
};
