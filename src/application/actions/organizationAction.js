import axios from 'axios';
import {
	ORGANIZATION_ADD_REQUEST,
	ORGANIZATION_ADD_SUCCESS,
	ORGANIZATION_ADD_FAIL,
	ORGANIZATION_DETAILS_REQUEST,
	ORGANIZATION_DETAILS_SUCCESS,
	ORGANIZATION_DETAILS_FAIL,
	ORGANIZATION_UPDATE_REQUEST,
	ORGANIZATION_UPDATE_SUCCESS,
	ORGANIZATION_UPDATE_FAIL,
	ORGANIZATION_DELETE_REQUEST,
	ORGANIZATION_DELETE_SUCCESS,
	ORGANIZATION_DELETE_FAIL,
	ORGANIZATION_LIST_REQUEST,
	ORGANIZATION_LIST_SUCCESS,
	ORGANIZATION_LIST_FAIL,
	ORGANIZATION_STAKEHOLDER_LIST_REQUEST,
	ORGANIZATION_STAKEHOLDER_LIST_SUCCESS,
	ORGANIZATION_STAKEHOLDER_LIST_FAIL,
	ORGANIZATION_PROJECT_FILTER,
	ORGANIZATION_PROJECT_FILTER_CLEAR,
	ORGANIZATION_STAKEHOLDER_FILTER,
	ORGANIZATION_STAKEHOLDER_FILTER_CLEAR,
	ORGANIZATION_ASSIGNMENT_REQUEST,
	ORGANIZATION_ASSIGNMENT_SUCCESS,
	ORGANIZATION_ASSIGNMENT_FAIL,
	ORGANIZAION_UPDATED_LIST_REQUEST,
	ORGANIZAION_UPDATED_LIST_SUCCESS,
} from '../constants/organizationConstants';
import { setAlert } from '../actions/alertActions';
import { getURL } from '../api';

// add an organization to a project
export const addOrganization =
	(organization, routeInfo, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: ORGANIZATION_ADD_REQUEST });

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
				`${getURL()}/api/v1/organizations`,
				organization,
				config
			);

			dispatch({ type: ORGANIZATION_ADD_SUCCESS, payload: data });

			// if assessment route exists
			if (routeInfo.length > 1) {
				history.push(routeInfo[1].path);
			} else {
				history.go(-1);
				dispatch(setAlert('Organization successfully added', 'success'));
			}
		} catch (error) {
			dispatch({
				type: ORGANIZATION_ADD_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

// get organization details
export const getOrganizationDetails = (orgId) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORGANIZATION_DETAILS_REQUEST });

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
		} = await axios.get(`${getURL()}/api/v1/organizations/${orgId}`, config);

		dispatch({ type: ORGANIZATION_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORGANIZATION_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// update organization
export const updateOrganization =
	(org, orgId, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: ORGANIZATION_UPDATE_REQUEST });

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

			await axios.put(`${getURL()}/api/v1/organizations/${orgId}`, org, config);

			dispatch({ type: ORGANIZATION_UPDATE_SUCCESS });
			history.go(-2);
			dispatch(setAlert('Organization successfully updated', 'success'));
		} catch (error) {
			dispatch({
				type: ORGANIZATION_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

// delete organization
export const deleteOrganization = (orgId) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORGANIZATION_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`${getURL()}/api/v1/organizations/${orgId}`, config);

		dispatch({ type: ORGANIZATION_DELETE_SUCCESS });
		dispatch(setAlert('Organization successfully deleted', 'success'));
	} catch (error) {
		dispatch({
			type: ORGANIZATION_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// list all organizations for a project
export const listProjectOrganizations =
	(id, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORGANIZATION_LIST_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/projects/${id}/organizations?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: ORGANIZATION_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORGANIZATION_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

// list all organizations for a location or community
export const listOrganizations =
	(id, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORGANIZATION_LIST_REQUEST });
			console.log('id', id);
			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/locations/${id}/organizations?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			console.log('returning data', data);

			dispatch({ type: ORGANIZATION_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORGANIZATION_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

// list all organizations for a stakeholder
export const listStakeholderOrganizations =
	(stakeholderId, keyword = '', pageNumber) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORGANIZATION_STAKEHOLDER_LIST_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/stakeholders/${stakeholderId}/organizations?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			console.log('returning data', data);

			dispatch({ type: ORGANIZATION_STAKEHOLDER_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORGANIZATION_STAKEHOLDER_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

// assign stakeholder to organization
export const assignStakeholder =
	(organizationId, assignments) => async (dispatch, getState) => {
		try {
			dispatch({ type: ORGANIZATION_ASSIGNMENT_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			//pass id, project, and config file to api
			const {
				data: { data },
			} = await axios.put(
				`${getURL()}/api/v1/organizations/${organizationId}/assign`,
				assignments,
				config
			);

			dispatch({ type: ORGANIZATION_ASSIGNMENT_SUCCESS, payload: data });
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;

			dispatch({
				type: ORGANIZATION_ASSIGNMENT_FAIL,
				payload: message,
			});
		}
	};

// organization assignment
export const assignOrganization = (data) => (dispatch) => {
	dispatch({ type: ORGANIZAION_UPDATED_LIST_REQUEST });
	dispatch({ type: ORGANIZAION_UPDATED_LIST_SUCCESS, payload: data });
};

// filter project Organizations
export const filterProjectOrganizations = (text) => (dispatch) => {
	dispatch({ type: ORGANIZATION_PROJECT_FILTER, payload: text });
};

// clear project Organizations
export const clearProjectOrganizationsFilter = () => (dispatch) => {
	dispatch({ type: ORGANIZATION_PROJECT_FILTER_CLEAR });
};

// filter stakeholder Organizations
export const filterStakeholderOrganizations = (text) => (dispatch) => {
	dispatch({ type: ORGANIZATION_STAKEHOLDER_FILTER, payload: text });
};

// clear stakeholder Organizations filter
export const clearStakeholderOrganizationsFilter = () => (dispatch) => {
	dispatch({ type: ORGANIZATION_STAKEHOLDER_FILTER_CLEAR });
};
