import axios from 'axios';
import {
	LOCATION_ADD_REQUEST,
	LOCATION_ADD_SUCCESS,
	LOCATION_ADD_FAIL,
	LOCATION_DETAILS_REQUEST,
	LOCATION_DETAILS_SUCCESS,
	LOCATION_DETAILS_FAIL,
	LOCATION_UPDATE_REQUEST,
	LOCATION_UPDATE_SUCCESS,
	LOCATION_UPDATE_FAIL,
	LOCATION_DELETE_REQUEST,
	LOCATION_DELETE_SUCCESS,
	LOCATION_DELETE_FAIL,
	LOCATION_LIST_REQUEST,
	LOCATION_LIST_SUCCESS,
	LOCATION_LIST_FAIL,
	LOCATION_USER_LIST_REQUEST,
	LOCATION_USER_LIST_SUCCESS,
	LOCATION_USER_LIST_FAIL,
	LOCATION_USER_LIST_FILTER,
	LOCATION_USER_LIST_FILTER_CLEAR,
} from '../constants/locationConstants';
import { setAlert } from '../actions/alertActions';
import { getURL } from '../api';

// add location
export const addLocation = (location, projectId) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: LOCATION_ADD_REQUEST });

		// get logged in user
		const { userLogin } = getState();

		// create config object
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userLogin.userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.post(
			`${getURL()}/api/v1/projects/${projectId}/locations`,
			location,
			config
		);

		dispatch({ type: LOCATION_ADD_SUCCESS, payload: data });
		dispatch(setAlert('Location successfully added', 'success'));
	} catch (error) {
		dispatch({
			type: LOCATION_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get location details
export const getLocationDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: LOCATION_DETAILS_REQUEST });

		// get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		// create config object
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(`${getURL()}/api/v1/locations/${id}`, config);

		dispatch({ type: LOCATION_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: LOCATION_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// update location
export const updateLocation = (location, id) => async (dispatch, getState) => {
	try {
		dispatch({ type: LOCATION_UPDATE_REQUEST });

		// get logged in user
		const { userLogin, projectDetails } = getState();

		// add projectId to location
		location.project = projectDetails.project._id;

		// create config object
		const config = {
			'Content-Type': 'application/json',
			headers: {
				Authorization: `Bearer ${userLogin.userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.put(`${getURL()}/api/v1/locations/${id}`, location, config);

		dispatch({ type: LOCATION_UPDATE_SUCCESS, payload: data });
		dispatch(setAlert('Location successfully updated', 'success'));
	} catch (error) {
		dispatch({
			type: LOCATION_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// delete location
export const deleteLocation = (id) => async (dispatch, getState) => {
	try {
		console.log(id);
		dispatch({ type: LOCATION_DELETE_REQUEST });

		// get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		// create config object
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`${getURL()}/api/v1/locations/${id}`, config);

		dispatch({ type: LOCATION_DELETE_SUCCESS });
		dispatch(setAlert('Location successfully removed', 'success'));
	} catch (error) {
		dispatch({
			type: LOCATION_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get list of locations
export const listLocations = (projectId) => async (dispatch, getState) => {
	try {
		dispatch({ type: LOCATION_LIST_REQUEST });

		// get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		// create config object
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(
			`${getURL()}/api/v1/projects/${projectId}/locations`,
			config
		);

		dispatch({ type: LOCATION_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: LOCATION_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get list of locations
export const listUserLocations = (userId) => async (dispatch, getState) => {
	try {
		dispatch({ type: LOCATION_USER_LIST_REQUEST });

		console.log('enter listUserlocations');

		// get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		// create config object
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(`${getURL()}/api/v1/locations/user/${userId}`, config);

		console.log(data);

		dispatch({ type: LOCATION_USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: LOCATION_USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// filter user projects
export const filterUserLocations = (text) => (dispatch) => {
	dispatch({ type: LOCATION_USER_LIST_FILTER, payload: text });
};

// clear user projects filter
export const clearUserLocationsFilter = () => (dispatch) => {
	dispatch({ type: LOCATION_USER_LIST_FILTER_CLEAR });
};
