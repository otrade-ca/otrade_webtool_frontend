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
	ACTIVITY_LIST_FILTER,
	ACTIVITY_LIST_FILTER_CLEAR,
	ACTIVITY_STAKEHOLDER_LIST_REQUEST,
	ACTIVITY_STAKEHOLDER_LIST_SUCCESS,
	ACTIVITY_STAKEHOLDER_LIST_FAIL,
	ACTIVITY_STAKEHOLDER_FILTER,
	ACTIVITY_STAKEHOLDER_FILTER_CLEAR,
	ACTIVITY_SAVE_REQUEST,
	ACTIVITY_SAVE_RESET,
} from '../constants/activityConstants';
import { setAlert } from '../actions/alertActions';
import { getURL } from '../api';

// add activity to a project
export const addActivity = (activity, history) => async (
	dispatch,
	getState
) => {
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

		const { _id, stakeholders, compromise } = data;

		if (compromise === 'Yes' || compromise === 'yes') {
			history.push(`/commitments/register/activity/${_id}`);
		}

		stakeholders.forEach((i) =>
			history.push(`/influences/register/stakeholder/${i}`)
		);
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

// get activity details
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

// update activity
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

// delete activity
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

// get all activities belonging to a project
export const listActivities = (projectId) => async (dispatch, getState) => {
	try {
		dispatch({ type: ACTIVITY_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(
			`${getURL()}/api/v1/projects/${projectId}/activities`,
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

// get all activities belonging to a stakeholder
export const listStakeholderActivities = (
	stakeholderId,
	keyword = ''
) => async (dispatch, getState) => {
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

		const {
			data: { data },
		} = await axios.get(
			`${getURL()}/api/v1/stakeholders/${stakeholderId}/activities?keywords=${keyword}`,
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

// filter project activities
export const filterProjectActivities = (text) => (dispatch) => {
	dispatch({ type: ACTIVITY_LIST_FILTER, payload: text });
};

// clear project activities
export const clearProjectActivitiesFilter = () => (dispatch) => {
	dispatch({ type: ACTIVITY_LIST_FILTER_CLEAR });
};

// filter stakeholder activities
export const filterStakeholderActivities = (text) => (dispatch) => {
	dispatch({ type: ACTIVITY_STAKEHOLDER_FILTER, payload: text });
};

// clear stakeholder activities filter
export const clearStakeholderActivitiesFilter = () => (dispatch) => {
	dispatch({ type: ACTIVITY_STAKEHOLDER_FILTER_CLEAR });
};
