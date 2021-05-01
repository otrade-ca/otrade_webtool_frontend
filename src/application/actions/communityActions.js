import axios from 'axios';
import {
	COMMUNITY_ADD_REQUEST,
	COMMUNITY_ADD_SUCCESS,
	COMMUNITY_ADD_FAIL,
	COMMUNITY_DETAILS_REQUEST,
	COMMUNITY_DETAILS_SUCCESS,
	COMMUNITY_DETAILS_FAIL,
	COMMUNITY_UPDATE_REQUEST,
	COMMUNITY_UPDATE_SUCCESS,
	COMMUNITY_UPDATE_FAIL,
	COMMUNITY_DELETE_REQUEST,
	COMMUNITY_DELETE_SUCCESS,
	COMMUNITY_DELETE_FAIL,
	COMMUNITY_LIST_REQUEST,
	COMMUNITY_LIST_SUCCESS,
	COMMUNITY_LIST_FAIL,
} from '../constants/communityConstants';
import { getURL } from '../api';

// add community
export const addCommunity = () => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMUNITY_ADD_REQUEST });

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
		} = await axios.post(``, config);

		dispatch({ type: COMMUNITY_ADD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMUNITY_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get community details
export const getCommunity = () => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMUNITY_DETAILS_REQUEST });

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
		} = await axios.get(``, config);

		dispatch({ type: COMMUNITY_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMUNITY_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// update community
export const updateCommunity = () => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMUNITY_UPDATE_REQUEST });

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
		} = await axios.put(``, config);

		dispatch({ type: COMMUNITY_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMUNITY_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// delete community
export const deleteCommunity = () => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMUNITY_DELETE_REQUEST });

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
		} = await axios.delete(``, config);

		dispatch({ type: COMMUNITY_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMUNITY_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get list of communities
export const listCommitments = () => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMUNITY_LIST_REQUEST });

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
		} = await axios.get(``, config);

		dispatch({ type: COMMUNITY_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMUNITY_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};
