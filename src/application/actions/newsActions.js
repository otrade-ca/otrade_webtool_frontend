/**
 * News action creators
 */
import axios from 'axios';
import {
	NEWS_ADD_REQUEST,
	NEWS_ADD_SUCCESS,
	NEWS_ADD_FAIL,
	NEWS_DETAILS_REQUEST,
	NEWS_DETAILS_SUCCESS,
	NEWS_DETAILS_FAIL,
	NEWS_DETAILS_RESET,
	NEWS_DELETE_RESET,
	NEWS_UPDATE_REQUEST,
	NEWS_UPDATE_SUCCESS,
	NEWS_UPDATE_FAIL,
	NEWS_UPDATE_RESET,
	NEWS_DELETE_REQUEST,
	NEWS_DELETE_SUCCESS,
	NEWS_DELETE_FAIL,
} from '../constants/newsConstants';

/**
 * Add news
 * @param {*} news
 * @param {*} history
 * @returns null
 */
export const addNews = (news, history) => async (dispatch, getState) => {
	try {
		dispatch({ type: NEWS_ADD_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(``, news, config);

		dispatch({ type: NEWS_ADD_SUCCESS });
	} catch (error) {
		dispatch({
			type: NEWS_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * Get news
 * @param {*} id
 * @returns null
 */
export const getNewsDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: NEWS_DETAILS_RESET });
		dispatch({ type: NEWS_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(``, config);

		dispatch({ type: NEWS_DETAILS_SUCCESS });
	} catch (error) {
		dispatch({
			type: NEWS_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * Update news
 * @param {*} news
 * @param {*} history
 * @returns null
 */
export const updateNews = (news, history) => async (dispatch, getState) => {
	try {
		dispatch({ type: NEWS_UPDATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(``, news, config);

		dispatch({ type: NEWS_UPDATE_SUCCESS });
	} catch (error) {
		dispatch({
			type: NEWS_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * Delete news
 * @param {*} id
 * @returns null
 */
export const deleteNews = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: NEWS_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.delete(``, config);

		dispatch({ type: NEWS_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: NEWS_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};
