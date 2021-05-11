import axios from 'axios';
import {
	INFLUENCE_ADD_REQUEST,
	INFLUENCE_ADD_SUCCESS,
	INFLUENCE_ADD_FAIL,
	INFLUENCE_DETAILS_REQUEST,
	INFLUENCE_DETAILS_SUCCESS,
	INFLUENCE_DETAILS_FAIL,
	INFLUENCE_DELETE_REQUEST,
	INFLUENCE_DELETE_SUCCESS,
	INFLUENCE_DELETE_FAIL,
	INFLUENCE_LIST_REQUEST,
	INFLUENCE_LIST_SUCCESS,
	INFLUENCE_LIST_FAIL,
	INFLUENCE_LIST_FILTER,
	INFLUENCE_LIST_FILTER_CLEAR,
} from '../constants/influenceConstants';
import { setAlert } from '../actions/alertActions';
import { getURL } from '../api';

// add influence
export const addInfluence = (influence, stakeholderId, history) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: INFLUENCE_ADD_REQUEST });

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
		} = await axios.post(
			`${getURL()}/api/v1/stakeholders/${stakeholderId}/influences`,
			influence,
			config
		);

		dispatch({ type: INFLUENCE_ADD_SUCCESS, payload: data });
		history.go(-2);
		dispatch(setAlert('Stakeholder Status successfully updated', 'success'));
	} catch (error) {
		dispatch({
			type: INFLUENCE_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// get influence
export const getInfluenceDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: INFLUENCE_DETAILS_REQUEST });

		//get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		//create config
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(`${getURL()}/api/v1/influences/${id}`, config);

		dispatch({ type: INFLUENCE_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: INFLUENCE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// delete influence
export const deleteInfluence = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: INFLUENCE_DELETE_REQUEST });

		//get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		//create config
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.get(`${getURL()}/api/v1/influences/${id}`, config);

		dispatch({ type: INFLUENCE_DELETE_SUCCESS });
		dispatch(setAlert('Influence successfully deleted', 'success'));
	} catch (error) {
		dispatch({
			type: INFLUENCE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// get stakeholderInfluences
export const listInfluences = (stakeholderId) => async (dispatch, getState) => {
	try {
		dispatch({ type: INFLUENCE_LIST_REQUEST });

		//get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		//create config
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(
			`${getURL()}/api/v1/stakeholders/${stakeholderId}/influences`,
			config
		);

		console.log('influences', data);

		dispatch({ type: INFLUENCE_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: INFLUENCE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// filter influences
export const filterInfluences = (text) => (dispatch) => {
	dispatch({ type: INFLUENCE_LIST_FILTER, payload: text });
};

// clear influences
export const clearInfluencesFilter = (text) => (dispatch) => {
	dispatch({ type: INFLUENCE_LIST_FILTER_CLEAR });
};
