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
	LOCATION_DROPDOWN_REQUEST,
	LOCATION_DROPDOWN_SUCCESS,
	LOCATION_DROPDOWN_FAIL,
	LOCATION_ASSIGN_REQUEST,
	LOCATION_ASSIGN_SUCCESS,
} from '../constants/locationConstants';
import { setAlert } from '../actions/alertActions';
import { getURL, getBucketInfo } from '../api';

/**
 * add location
 * @param {*} location
 * @param {*} projectId
 * @param {*} history
 * @returns
 */
export const addLocation =
	(location, projectId, history) => async (dispatch, getState) => {
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
			history.go(-1);
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

/**
 * get location details
 * @param {*} id
 * @returns
 */
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
		localStorage.setItem('locationId', JSON.stringify(data._id));
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

/**
 * update location
 * @param {*} location
 * @param {*} id
 * @returns
 */
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

/**
 * uploads a photo for a location
 * @param {*} location
 * @param {*} file
 * @param {*} history
 * @returns
 */
export const updateLocationPhoto =
	(location, file, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: LOCATION_UPDATE_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const instructions = getBucketInfo('location');
			instructions.id = location.id;
			instructions.contentType = file.type;

			//get presigned url
			const {
				data: { key, url },
			} = await axios.post(`${getURL()}/api/v1/upload`, instructions, config);

			// upload to AWS
			await axios.put(url, file, {
				'Content-Type': file.type,
			});

			location.image = key;

			const {
				data: { data },
			} = await axios.put(
				`${getURL()}/api/v1/locations/${location.id}/profilePhoto`,
				location,
				config
			);

			dispatch({ type: LOCATION_UPDATE_SUCCESS, payload: data });
			history.go(-1);
			dispatch(setAlert('Community successfully updated', 'success'));
		} catch (error) {
			dispatch({
				type: LOCATION_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

/**
 * delete location
 * @param {*} id
 * @returns
 */
export const deleteLocation = (id) => async (dispatch, getState) => {
	try {
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

/**
 * get list of locations
 * @param {*} projectId
 * @param {*} keyword
 * @param {*} pageNumber
 * @returns
 */
export const listLocations =
	(projectId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
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

			const { data } = await axios.get(
				`${getURL()}/api/v1/projects/${projectId}/locations?keyword=${keyword}&pageNumber=${pageNumber}`,
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

/**
 * get list of locations
 * @param {*} userId
 * @returns
 */
export const listUserLocations = (userId) => async (dispatch, getState) => {
	try {
		dispatch({ type: LOCATION_USER_LIST_REQUEST });

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

/**
 * get list of locations
 * @param {*} projectId
 * @returns
 */
export const listDropdownLocations =
	(projectId) => async (dispatch, getState) => {
		try {
			dispatch({ type: LOCATION_DROPDOWN_REQUEST });

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

			const { data } = await axios.get(
				`${getURL()}/api/v1/projects/${projectId}/dropdown/locations`,
				config
			);

			dispatch({ type: LOCATION_DROPDOWN_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: LOCATION_DROPDOWN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * adds a stakeholder to a list of stakeholders for dropdown
 * @param {*} data
 * @returns
 */
export const assignLocation = (data) => (dispatch) => {
	dispatch({ type: LOCATION_ASSIGN_REQUEST });
	dispatch({ type: LOCATION_ASSIGN_SUCCESS, payload: data });
};
