import {
	ROUTE_SAVE_REQUEST,
	ROUTE_SAVE_RESET,
} from '../constants/routeConstants';

/**
 * saves routeInfo
 * @param {*} data
 * @returns
 */
export const saveRouteInfo = (data) => (dispatch) => {
	dispatch({
		type: ROUTE_SAVE_REQUEST,
		payload: data,
	});
};

/**
 * removes routeInfo
 * @returns
 */
export const removeRouteInfo = () => (dispatch) => {
	dispatch({ type: ROUTE_SAVE_RESET });
};
