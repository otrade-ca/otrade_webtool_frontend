import axios from 'axios';
import {
	ACTIVITY_ADD_REQUEST,
	ACTIVITY_ADD_SUCCESS,
	ACTIVITY_ADD_FAIL,
	ACTIVITY_DETAILS_REQUEST,
	ACTIVITY_DETAILS_SUCCESS,
	ACTIVITY_DETAILS_FAIL,
	ACTIVITY_UPDATE_REQUEST,
	ACTIVITY_UPDATE_SUCCESS,
	ACTIVITY_UPDATE_FAIL,
	ACTIVITY_DELETE_REQUEST,
	ACTIVITY_DELETE_SUCCESS,
	ACTIVITY_DELETE_FAIL,
	ACTIVITY_LIST_REQUEST,
	ACTIVITY_LIST_SUCCESS,
	ACTIVITY_LIST_FAIL,
	ACTIVITY_STAKEHOLDER_LIST_REQUEST,
	ACTIVITY_STAKEHOLDER_LIST_SUCCESS,
	ACTIVITY_STAKEHOLDER_LIST_FAIL,
	ACTIVITY_SAVE_REQUEST,
	ACTIVITY_SAVE_RESET,
	ACTIVITY_DETAILS_RESET,
} from '../constants/activityConstants';
//import { COMMITMENT_DETAILS_RESET } from '../constants/commitmentConstants';
import { setAlert } from '../actions/alertActions';
import { saveRouteInfo } from '../actions/routeActions';
import { getURL } from '../api';

/**
 * adss an activity
 * @param {*} activity
 * @param {*} routeInfo
 * @param {*} history
 * @returns
 */
export const addActivity =
	(activity, routeInfo, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: ACTIVITY_ADD_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const {
				data: { data },
			} = await axios.post(`${getURL()}/api/v1/activities`, activity, config);

			dispatch({ type: ACTIVITY_ADD_SUCCESS, payload: data });

			// determine if to push to collect org or assessment info
			// get id, stakeholders, and comp value from returned data
			const { _id, stakeholders, compromise } = data;

			// get copy of updatedRoutes
			let updatedRoutes = [...routeInfo];
			// push final route to updatedRoutes array
			updatedRoutes.push({
				route: 'assessment',
				path: `/influences/register/stakeholder/${stakeholders[0]}`,
			});
			dispatch(saveRouteInfo(updatedRoutes));

			// if yes to comp, push to collect commitment info
			if (compromise === 'Yes' || compromise === 'yes') {
				history.push(`/commitments/register/activity/${_id}`);
			} else {
				// else navigate to assessment
				const navigateToRoute = updatedRoutes.pop();
				// save route
				dispatch(saveRouteInfo(updatedRoutes));
				// go to influence page
				history.push(navigateToRoute.path);
			}
		} catch (error) {
			dispatch({
				type: ACTIVITY_ADD_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * get activity details
 * @param {*} id
 * @returns
 */
export const getActivityDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ACTIVITY_DETAILS_REQUEST });

		//get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		//create config object
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(`${getURL()}/api/v1/activities/${id}`, config);

		dispatch({ type: ACTIVITY_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ACTIVITY_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * updates an activity
 * @param {*} activity
 * @param {*} id
 * @returns
 */
export const updateActivity = (activity, id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ACTIVITY_UPDATE_REQUEST });

		//get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		//create config object
		const config = {
			'Content-Type': 'application/json',
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.put(
			`${getURL()}/api/v1/activities/${id}`,
			activity,
			config
		);

		dispatch({ type: ACTIVITY_UPDATE_SUCCESS, payload: data });
		dispatch(setAlert('Activity successfully updated', 'success'));
	} catch (error) {
		dispatch({
			type: ACTIVITY_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * deletes an activity
 * @param {*} id
 * @returns
 */
export const deleteActivity = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ACTIVITY_DELETE_REQUEST });

		//get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		//create config object
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`${getURL()}/api/v1/activities/${id}`, config);

		dispatch({ type: ACTIVITY_DELETE_SUCCESS });
		dispatch(setAlert('Activity successfully deleted', 'success'));
	} catch (error) {
		dispatch({
			type: ACTIVITY_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * get all project activities
 * @param {*} projectId
 * @param {*} keyword
 * @param {*} pageNumber
 * @returns
 */
export const listActivities =
	(projectId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ACTIVITY_LIST_REQUEST });
			dispatch({ type: ACTIVITY_DETAILS_RESET });
			//dispatch({ type: COMMITMENT_DETAILS_RESET });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/projects/${projectId}/activities?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: ACTIVITY_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ACTIVITY_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * get all stakeholder activities
 * @param {*} stakeholderId
 * @param {*} keyword
 * @param {*} pageNumber
 * @returns
 */
export const listStakeholderActivities =
	(stakeholderId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ACTIVITY_STAKEHOLDER_LIST_REQUEST });

			//get logged in user
			const {
				userLogin: { userInfo },
			} = getState();

			//create config object
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/stakeholders/${stakeholderId}/activities?keywords=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: ACTIVITY_STAKEHOLDER_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ACTIVITY_STAKEHOLDER_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

// save stakeholder info to localstorage
export const saveActivityInfo = (data) => (dispatch) => {
	dispatch({
		type: ACTIVITY_SAVE_REQUEST,
		payload: data,
	});
	localStorage.setItem('activityInfo', JSON.stringify(data));
};

// remove stakeholder info from localstorage
export const removeActivityInfo = () => (dispatch) => {
	dispatch({ type: ACTIVITY_SAVE_RESET });
	localStorage.removeItem('activityInfo');
};
