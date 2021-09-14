import axios from 'axios';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_PROFILE_UPDATE_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
} from '../constants/userConstants';
import { getURL, getBucketInfo } from '../api';
import { PROJECT_LIST_RESET } from '../constants/projectConstants';
import {
	STAKEHOLDER_LIST_RESET,
	STAKEHOLDER_PROJECT_LIST_RESET,
	STAKEHOLDER_LOCATION_LIST_RESET,
	STAKEHOLDER_USER_LIST_RESET,
} from '../constants/stakeholderConstants';
import { ORGANIZATION_PROJECT_LIST_RESET } from '../constants/organizationConstants';
import { ACTIVITY_LIST_RESET } from '../constants/activityConstants';
import { setAlert } from '../actions/alertActions';
import { BREADCRUMB_SAVE_RESET } from '../constants/routeConstants';

/**
 * logins a user
 * @param {*} email
 * @param {*} password
 * @returns	null
 */
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			`${getURL()}/api/v1/users/login`,
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * registers a user
 * @param {*} user
 * @returns null
 */
export const registerUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		//get userInfo from state
		const {
			userLogin: { userInfo },
		} = getState();

		//define headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`${getURL()}/api/v1/users`, user, config);

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * logs out a user
 * @returns null
 */
export const logout = () => (dispatch) => {
	// remove the user from localstorage
	localStorage.removeItem('userInfo');
	localStorage.removeItem('projectInfo');
	localStorage.removeItem('stakeholdersListInfo');
	localStorage.removeItem('organizationsListInfo');
	localStorage.removeItem('locationId');
	localStorage.removeItem('projectDetailsInfo');

	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: PROJECT_LIST_RESET });
	dispatch({ type: STAKEHOLDER_LIST_RESET });
	dispatch({ type: STAKEHOLDER_USER_LIST_RESET });
	dispatch({ type: STAKEHOLDER_LOCATION_LIST_RESET });
	dispatch({ type: STAKEHOLDER_PROJECT_LIST_RESET });
	dispatch({ type: ORGANIZATION_PROJECT_LIST_RESET });
	dispatch({ type: ACTIVITY_LIST_RESET });
	dispatch({ type: BREADCRUMB_SAVE_RESET });
};

/**
 * gets user details
 * @param {*} id
 * @returns	null
 */
export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		//get userInfo from state
		const {
			userLogin: { userInfo },
		} = getState();

		//define headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//pass name, email, password, and config to api
		const {
			data: { data },
		} = await axios.get(`${getURL()}/api/v1/users/${id}`, config);

		//dispatch
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * updates a user profile
 * @param {*} user
 * @returns	null
 */
export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_PROFILE_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`${getURL()}/api/v1/users/profile`,
			user,
			config
		);

		dispatch({
			type: USER_PROFILE_UPDATE_SUCCESS,
			payload: data,
		});

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		dispatch(setAlert('User successfully updated', 'success'));
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed') {
			dispatch(logout());
		}
		dispatch({
			type: USER_PROFILE_UPDATE_FAIL,
			payload: message,
		});
	}
};

/**
 * updates user profile photo
 * @param {*} user
 * @param {*} file
 * @param {*} history
 * @returns null
 */
export const updateUserProfilePhoto =
	(user, file, history) => async (dispatch, getState) => {
		try {
			dispatch({
				type: USER_PROFILE_UPDATE_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const instructions = getBucketInfo('user');
			instructions.id = user.id;
			instructions.contentType = file.type;

			// get presigned url
			const {
				data: { key, url },
			} = await axios.post(`${getURL()}/api/v1/upload`, instructions, config);

			// upload to AWS
			await axios.put(url, file, {
				'Content-Type': file.type,
			});

			user.image = key;

			const { data } = await axios.put(
				`${getURL()}/api/v1/users/profilePhoto`,
				user,
				config
			);

			dispatch({
				type: USER_PROFILE_UPDATE_SUCCESS,
				payload: data,
			});

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			});

			history.go(-1);
			dispatch(setAlert('User successfully updated', 'success'));
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			if (message === 'Not authorized, token failed') {
				dispatch(logout());
			}
			dispatch({
				type: USER_PROFILE_UPDATE_FAIL,
				payload: message,
			});
		}
	};

/**
 * list users
 * @param {*} keyword
 * @param {*} pageNumber
 * @returns null
 */
export const listUsers =
	(keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: USER_LIST_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/users?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: USER_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: USER_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * deletes user
 * @param {*} id
 * @returns null
 */
export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`${getURL()}/api/v1/users/${id}`, config);

		dispatch({
			type: USER_DELETE_SUCCESS,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed') {
			dispatch(logout());
		}
		dispatch({
			type: USER_DELETE_FAIL,
			payload: message,
		});
	}
};

/**
 * updates user
 * @param {*} user
 * @returns
 */
export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`${getURL()}/api/v1/users/${user._id}`,
			user,
			config
		);

		dispatch({
			type: USER_UPDATE_SUCCESS,
		});
		dispatch({ type: USER_DELETE_SUCCESS, payload: data });
		dispatch(setAlert('User successfully registered', 'success'));
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed') {
			dispatch(logout());
		}
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: message,
		});
	}
};
