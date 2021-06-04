import {
	ROUTE_SAVE_REQUEST,
	ROUTE_SAVE_RESET,
} from '../constants/routeConstants';

// save stakeholder info to localstorage to use in processing form
export const saveRouteInfo = (data) => (dispatch) => {
	console.log('saving route');
	dispatch({
		type: ROUTE_SAVE_REQUEST,
		payload: data,
	});
	localStorage.setItem('route', JSON.stringify(data));
};

// remove stakeholder info from localstorage to use in processing form
export const removeRouteInfo = () => (dispatch) => {
	dispatch({ type: ROUTE_SAVE_RESET });
	localStorage.removeItem('route');
};