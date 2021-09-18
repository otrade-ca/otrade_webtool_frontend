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
	STAKEHOLDER_USER_LIST_REQUEST,
	STAKEHOLDER_USER_LIST_SUCCESS,
	STAKEHOLDER_USER_LIST_FAIL,
	STAKEHOLDER_LOCATION_LIST_REQUEST,
	STAKEHOLDER_LOCATION_LIST_SUCCESS,
	STAKEHOLDER_LOCATION_LIST_FAIL,
	STAKEHOLDER_PROJECT_LIST_REQUEST,
	STAKEHOLDER_PROJECT_LIST_SUCCESS,
	STAKEHOLDER_PROJECT_LIST_FAIL,
	STAKEHOLDER_ASSIGN_REQUEST,
	STAKEHOLDER_ASSIGN_SUCCESS,
	STAKEHOLDER_DETAILS_RESET,
	STAKEHOLDER_DROPDOWN_REQUEST,
	STAKEHOLDER_DROPDOWN_SUCCESS,
	STAKEHOLDER_DROPDOWN_FAIL,
} from '../constants/stakeholderConstants';
import { setAlert } from '../actions/alertActions';
import { saveRouteInfo } from '../actions/routeActions';
import { getURL, getBucketInfo } from '../api';

/**
 * adds a stakeholder
 * @param {*} stakeholder
 * @param {*} locationId
 * @param {*} routeInfo
 * @param {*} history
 * @returns
 */
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
				console.log(navigateToRoute);
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

/**
 * gets stakeholder details
 * @param {*} id
 * @returns
 */
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

/**
 * updates stakeholder
 * @param {*} stakeholder
 * @param {*} id
 * @returns
 */
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

/**
 * updates a stakeholder photo
 * @param {*} stakeholder
 * @param {*} file
 * @param {*} history
 * @returns
 */
export const updateStakeholderPhoto =
	(stakeholder, file, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: STAKEHOLDER_UPDATE_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const instructions = getBucketInfo('stakeholder');
			instructions.id = stakeholder.id;
			instructions.contentType = file.type;

			//get presigned url
			const {
				data: { key, url },
			} = await axios.post(`${getURL()}/api/v1/upload`, instructions, config);

			// upload to AWS
			await axios.put(url, file, {
				'Content-Type': file.type,
			});

			stakeholder.image = key;

			const {
				data: { data },
			} = await axios.put(
				`${getURL()}/api/v1/stakeholders/${stakeholder.id}/profilePhoto`,
				stakeholder,
				config
			);

			dispatch({ type: STAKEHOLDER_UPDATE_SUCCESS, payload: data });
			history.go(-1);
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

/**
 * deletes stakeholders
 * @param {*} id
 * @returns
 */
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

/**
 * list all stakeholders across all projects for a user
 * @param {*} id
 * @returns
 */
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

/**
 * list all stakeholders across a location
 * @param {*} id
 * @returns
 */
export const listLocationStakeholders =
	(locationId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
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

			const { data } = await axios.get(
				`${getURL()}/api/v1/locations/${locationId}/stakeholders?keyword=${keyword}&pageNumber=${pageNumber}`,
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

/**
 * list all stakeholders across a project
 * @param {*} id
 * @param {*} keyword
 * @param {*} pageNumber
 * @returns
 */
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

/**
 * list all stakeholders in a project location for dropdown
 * @param {*} id
 * @returns
 */
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

/**
 * saves member dropdown information
 * @param {*} data
 * @returns
 */
export const assignStakeholder = (data) => (dispatch) => {
	dispatch({ type: STAKEHOLDER_ASSIGN_REQUEST });
	dispatch({ type: STAKEHOLDER_ASSIGN_SUCCESS, payload: data });
};

// // save stakeholder info to localstorage to use in processing form
// export const saveStakeholderInfo = (data) => (dispatch) => {
// 	dispatch({
// 		type: STAKEHOLDER_SAVE_REQUEST,
// 		payload: data,
// 	});
// 	localStorage.setItem('stakeholdersInfo', JSON.stringify(data));
// };

// // remove stakeholder info from localstorage to use in processing form
// export const removeStakeholderInfo = () => (dispatch) => {
// 	dispatch({ type: STAKEHOLDER_SAVE_RESET });
// 	localStorage.removeItem('stakeholdersInfo');
// };
