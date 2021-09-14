import axios from 'axios';
import {
	COMMITMENT_ADD_REQUEST,
	COMMITMENT_ADD_SUCCESS,
	COMMITMENT_ADD_FAIL,
	COMMITMENT_DETAILS_REQUEST,
	COMMITMENT_DETAILS_SUCCESS,
	COMMITMENT_DETAILS_FAIL,
	COMMITMENT_UPDATE_REQUEST,
	COMMITMENT_UPDATE_SUCCESS,
	COMMITMENT_UPDATE_FAIL,
	COMMITMENT_DELETE_REQUEST,
	COMMITMENT_DELETE_SUCCESS,
	COMMITMENT_DELETE_FAIL,
	COMMITMENT_LIST_REQUEST,
	COMMITMENT_LIST_SUCCESS,
	COMMITMENT_LIST_FAIL,
} from '../constants/commitmentConstants';
import { getURL } from '../api';

// add commitment
export const addCommitment =
	(commitment, id, routeInfo, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: COMMITMENT_ADD_REQUEST });

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
			} = await axios.post(
				`${getURL()}/api/v1/activities/${id}/commitments`,
				commitment,
				config
			);

			dispatch({ type: COMMITMENT_ADD_SUCCESS, payload: data });
			// console.log(routeInfo);
			// history.push(routeInfo[routeInfo.length - 1].path);
		} catch (error) {
			dispatch({
				type: COMMITMENT_ADD_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

// get commitment details for an activity
export const getCommitment = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMITMENT_DETAILS_REQUEST });

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
			`${getURL()}/api/v1/activities/${id}/commitment`,
			config
		);

		dispatch({ type: COMMITMENT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMITMENT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// update commitment
export const updateCommitment =
	(commitment, id) => async (dispatch, getState) => {
		try {
			dispatch({ type: COMMITMENT_UPDATE_REQUEST });

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
				`${getURL()}/api/v1/commitment/${id}`,
				commitment,
				config
			);

			dispatch({ type: COMMITMENT_UPDATE_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: COMMITMENT_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

// delete commitment
export const deleteCommitment = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMITMENT_DELETE_REQUEST });

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
		} = await axios.delete(`${getURL()}/api/v1/commitment/${id}`, config);

		dispatch({ type: COMMITMENT_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMITMENT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get list of commitments for a stakeholder
export const listCommitments = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMITMENT_LIST_REQUEST });

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
			`${getURL()}/api/v1/stakeholders/${id}/commitments`,
			config
		);

		dispatch({ type: COMMITMENT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMITMENT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};
