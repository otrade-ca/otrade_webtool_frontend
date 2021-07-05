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
	NEWS_UPDATE_REQUEST,
	NEWS_UPDATE_SUCCESS,
	NEWS_UPDATE_FAIL,
	NEWS_DELETE_REQUEST,
	NEWS_DELETE_SUCCESS,
	NEWS_DELETE_FAIL,
	NEWS_LIST_PROJECT_REQUEST,
	NEWS_LIST_PROJECT_SUCCESS,
	NEWS_LIST_PROJECT_FAIL,
	NEWS_LIST_LOCATION_REQUEST,
	NEWS_LIST_LOCATION_SUCCESS,
	NEWS_LIST_LOCATION_FAIL,
	NEWS_LIST_STAKEHOLDER_REQUEST,
	NEWS_LIST_STAKEHOLDER_SUCCESS,
	NEWS_LIST_STAKEHOLDER_FAIL,
	NEWS_LIST_ORGANIZATION_REQUEST,
	NEWS_LIST_ORGANIZATION_SUCCESS,
	NEWS_LIST_ORGANIZATION_FAIL,
} from '../constants/newsConstants';
import { setAlert } from '../actions/alertActions';
import { getURL } from '../api';

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

		const { data } = await axios.post(`${getURL()}/api/v1/news`, news, config);

		dispatch({ type: NEWS_ADD_SUCCESS, payload: data });
		history.go(-1);
		dispatch(setAlert('News successfully added', 'success'));
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
		//dispatch({ type: NEWS_DETAILS_RESET });
		dispatch({ type: NEWS_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`${getURL()}/api/v1/news/${id}`, config);
		dispatch({ type: NEWS_DETAILS_SUCCESS, payload: data });
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
export const updateNews = (id, news, history) => async (dispatch, getState) => {
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

		const { data } = await axios.put(`api/v1/news/${id}`, news, config);

		dispatch({ type: NEWS_UPDATE_SUCCESS, payload: data });
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

		await axios.delete(`/api/news/${id}`, config);

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

/**
 * get all news for a project
 * @param {*} id
 * @returns
 */
export const listProjectNews =
	(projectId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: NEWS_LIST_PROJECT_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/projects/${projectId}/news?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: NEWS_LIST_PROJECT_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: NEWS_LIST_PROJECT_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * get all news for a location or community
 * @param {*} id
 * @returns
 */
export const listLocationNews =
	(locationId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: NEWS_LIST_LOCATION_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/locations/${locationId}/news?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: NEWS_LIST_LOCATION_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: NEWS_LIST_LOCATION_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * get all news for a stakeholder
 * @param {*} id
 * @returns
 */
export const listStakeholderNews =
	(stakeholderId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: NEWS_LIST_STAKEHOLDER_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/stakeholders/${stakeholderId}/news?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: NEWS_LIST_STAKEHOLDER_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: NEWS_LIST_STAKEHOLDER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * get all news for an organization
 * @param {*} id
 * @returns
 */
export const listOrganizationNews =
	(organizationId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: NEWS_LIST_ORGANIZATION_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/organizations/${organizationId}/news?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: NEWS_LIST_ORGANIZATION_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: NEWS_LIST_ORGANIZATION_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};
