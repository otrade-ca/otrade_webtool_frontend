import axios from 'axios';
import {
	STAKEHOLDER_ADD_REQUEST,
	STAKEHOLDER_ADD_SUCCESS,
	STAKEHOLDER_ADD_FAIL,
	STAKEHOLDER_DETAILS_REQUEST,
	STAKEHOLDER_DETAILS_SUCCESS,
	STAKEHOLDER_DETAILS_FAIL,
	STAKEHOLDER_UPDATE_REQUEST,
	STAKEHOLDER_UPDATE_SUCCESS,
	STAKEHOLDER_UPDATE_FAIL,
	STAKEHOLDER_DELETE_REQUEST,
	STAKEHOLDER_DELETE_SUCCESS,
	STAKEHOLDER_DELETE_FAIL,
	STAKEHOLDER_LIST_REQUEST,
	STAKEHOLDER_LIST_SUCCESS,
	STAKEHOLDER_LIST_FAIL,
	STAKEHOLDER_PROJECT_FILTER_CLEAR,
	STAKEHOLDER_SAVE_RESET,
	STAKEHOLDER_USER_LIST_REQUEST,
	STAKEHOLDER_USER_LIST_SUCCESS,
	STAKEHOLDER_USER_LIST_FAIL,
	STAKEHOLDER_LOCATION_LIST_REQUEST,
	STAKEHOLDER_LOCATION_LIST_SUCCESS,
	STAKEHOLDER_LOCATION_LIST_FAIL,
	STAKEHOLDER_PROJECT_LIST_REQUEST,
	STAKEHOLDER_PROJECT_LIST_SUCCESS,
	STAKEHOLDER_PROJECT_LIST_FAIL,
	STAKEHOLDER_PROJECT_LIST_FILTER,
	STAKEHOLDER_PROJECT_LIST_FILTER_CLEAR,
	STAKEHOLDER_USER_FILTER,
	STAKEHOLDER_USER_FILTER_CLEAR,
	STAKEHOLDER_LOCATION_FILTER,
	STAKEHOLDER_LOCATION_FILTER_CLEAR,
	STAKEHOLDER_ASSIGN_REQUEST,
	STAKEHOLDER_ASSIGN_SUCCESS,
	STAKEHOLDER_SAVE_REQUEST,
	STAKEHOLDER_PROJECT_FILTER,
	STAKEHOLDER_DETAILS_RESET,
	STAKEHOLDER_DROPDOWN_REQUEST,
	STAKEHOLDER_DROPDOWN_SUCCESS,
	STAKEHOLDER_DROPDOWN_FAIL,
} from '../constants/stakeholderConstants';
import { setAlert } from '../actions/alertActions';
import { saveRouteInfo } from '../actions/routeActions';
import { getURL } from '../api';

// add stakeholder
export const addStakeholder =
	(stakeholder, locationId, routeInfo, history) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: STAKEHOLDER_ADD_REQUEST });

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
			} = await axios.post(
				`${getURL()}/api/v1/locations/${locationId}/stakeholders`,
				stakeholder,
				config
			);

			dispatch({ type: STAKEHOLDER_ADD_SUCCESS, payload: data });

			// destructure id, organization from data
			const { _id, organization } = data;
			// get copy of updatedRoutes
			let updatedRoutes = [...routeInfo];

			updatedRoutes.push({
				route: 'assessment',
				path: `/influences/register/stakeholder/${_id}`,
			});

			// save routes
			dispatch(saveRouteInfo(updatedRoutes));

			// if a response for organization is yes
			if (organization === 'yes' || organization === 'Yes') {
				// navigate to and collect org info
				history.push(`/organizations/register/community/${locationId}`);
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
				type: STAKEHOLDER_ADD_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

// get stakeholder details
export const getStakeholderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: STAKEHOLDER_DETAILS_RESET });
		dispatch({ type: STAKEHOLDER_DETAILS_REQUEST });

		// get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		// create config
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(`${getURL()}/api/v1/stakeholders/${id}`, config);

		dispatch({ type: STAKEHOLDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: STAKEHOLDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// update stakeholder
export const updateStakeholder =
	(stakeholder, id) => async (dispatch, getState) => {
		try {
			dispatch({ type: STAKEHOLDER_UPDATE_REQUEST });

			//get logged in user
			const {
				userLogin: { userInfo },
			} = getState();

			//create config obj
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const {
				data: { data },
			} = await axios.put(
				`${getURL()}/api/v1/stakeholders/${id}`,
				stakeholder,
				config
			);

			console.log(data);

			dispatch({ type: STAKEHOLDER_UPDATE_SUCCESS, payload: data });
			dispatch(setAlert('Stakeholder successfully updated', 'success'));
		} catch (error) {
			dispatch({
				type: STAKEHOLDER_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

// delete stakeholder
export const deleteStakeholder = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: STAKEHOLDER_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`${getURL()}/api/v1/stakeholders/${id}`, config);

		dispatch({ type: STAKEHOLDER_DELETE_SUCCESS });
		dispatch(setAlert('Stakeholder successfully deleted', 'success'));
	} catch (error) {
		dispatch({
			type: STAKEHOLDER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// list all stakeholders in a project location
export const listStakeholders =
	(id, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: STAKEHOLDER_LIST_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/locations/${id}/stakeholders?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: STAKEHOLDER_LIST_SUCCESS, payload: data });

			// localStorage.setItem('stakeholdersListInfo', JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: STAKEHOLDER_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

// list all stakeholders across all projects for a user
export const listUserStakeholders = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: STAKEHOLDER_USER_LIST_REQUEST });

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
		} = await axios.get(`${getURL()}/api/v1/stakeholders/user/${id}`, config);

		dispatch({ type: STAKEHOLDER_USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: STAKEHOLDER_USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// list all stakeholders across a location
export const listLocationStakeholders = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: STAKEHOLDER_LOCATION_LIST_REQUEST });
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
			`${getURL()}/api/v1/locations/${id}/stakeholders`,
			config
		);

		dispatch({ type: STAKEHOLDER_LOCATION_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: STAKEHOLDER_LOCATION_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// list all stakeholders across a project
export const listProjectStakeholders =
	(id, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: STAKEHOLDER_PROJECT_LIST_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/stakeholders/project/${id}?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: STAKEHOLDER_PROJECT_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: STAKEHOLDER_PROJECT_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

// adds a stakeholder to a list of stakeholders for dropdown
export const assignStakeholder = (data) => (dispatch) => {
	dispatch({ type: STAKEHOLDER_ASSIGN_REQUEST });
	dispatch({ type: STAKEHOLDER_ASSIGN_SUCCESS, payload: data });
};

// save stakeholder info to localstorage to use in processing form
export const saveStakeholderInfo = (data) => (dispatch) => {
	dispatch({
		type: STAKEHOLDER_SAVE_REQUEST,
		payload: data,
	});
	localStorage.setItem('stakeholdersInfo', JSON.stringify(data));
};

// list all stakeholders in a project location for dropdown
export const listStakeholdersDropdown = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: STAKEHOLDER_DROPDOWN_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(
			`${getURL()}/api/v1/stakeholders/dropdown/project/${id}`,
			config
		);

		dispatch({ type: STAKEHOLDER_DROPDOWN_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: STAKEHOLDER_DROPDOWN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// remove stakeholder info from localstorage to use in processing form
export const removeStakeholderInfo = () => (dispatch) => {
	dispatch({ type: STAKEHOLDER_SAVE_RESET });
	localStorage.removeItem('stakeholdersInfo');
};

// filter user projects
export const filterProjectStakeholders = (text) => (dispatch) => {
	dispatch({ type: STAKEHOLDER_PROJECT_FILTER, payload: text });
};

// clear user projects filter
export const clearProjectStakeholdersFilter = () => (dispatch) => {
	dispatch({ type: STAKEHOLDER_PROJECT_FILTER_CLEAR });
};

// filter user projects
export const filterUserStakeholders = (text) => (dispatch) => {
	dispatch({ type: STAKEHOLDER_USER_FILTER, payload: text });
};

// clear user projects filter
export const clearUserStakeholdersFilter = () => (dispatch) => {
	dispatch({ type: STAKEHOLDER_USER_FILTER_CLEAR });
};

// filter location stakeholders
export const filterLocationStakeholders = (text) => (dispatch) => {
	dispatch({ type: STAKEHOLDER_LOCATION_FILTER, payload: text });
};

// clear Location projects filter
export const clearLocationStakeholdersFilter = () => (dispatch) => {
	dispatch({ type: STAKEHOLDER_LOCATION_FILTER_CLEAR });
};

// filter location stakeholders
export const filterProjectListStakeholders = (text) => (dispatch) => {
	dispatch({ type: STAKEHOLDER_PROJECT_LIST_FILTER, payload: text });
};

// clear Location projects filter
export const clearProjectListStakeholdersFilter = () => (dispatch) => {
	dispatch({ type: STAKEHOLDER_PROJECT_LIST_FILTER_CLEAR });
};
