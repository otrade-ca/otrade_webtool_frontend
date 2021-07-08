import axios from 'axios';
import {
	PROJECT_ADD_REQUEST,
	PROJECT_ADD_SUCCESS,
	PROJECT_ADD_FAIL,
	PROJECT_DETAILS_REQUEST,
	PROJECT_DETAILS_SUCCESS,
	PROJECT_DETAILS_FAIL,
	PROJECT_UPDATE_REQUEST,
	PROJECT_UPDATE_SUCCESS,
	PROJECT_UPDATE_FAIL,
	PROJECT_DELETE_REQUEST,
	PROJECT_DELETE_SUCCESS,
	PROJECT_DELETE_FAIL,
	PROJECT_LIST_REQUEST,
	PROJECT_LIST_SUCCESS,
	PROJECT_LIST_FAIL,
	PROJECT_USER_REQUEST,
	PROJECT_USER_SUCCESS,
	PROJECT_USER_FAIL,
	PROJECT_ASSIGNMENT_REQUEST,
	PROJECT_ASSIGNMENT_SUCCESS,
	PROJECT_ASSIGNMENT_FAIL,
	PROJECT_SAVE_REQUEST,
} from '../constants/projectConstants';
import { setAlert } from '../actions/alertActions';
import { getURL, getBucketInfo } from '../api';

/**
 * adds a project
 * @param {*} project
 * @returns
 */
export const addProject = (project) => async (dispatch, getState) => {
	try {
		dispatch({ type: PROJECT_ADD_REQUEST });

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
		} = await axios.post(`${getURL()}/api/v1/projects/`, project, config);

		dispatch({ type: PROJECT_ADD_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;

		dispatch({
			type: PROJECT_ADD_FAIL,
			payload: message,
		});
	}
};

/**
 * gets a projects details
 * @param {*} id
 * @returns
 */
export const listProjectDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PROJECT_DETAILS_REQUEST });

		// get userlogin from storage
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(
			`${getURL()}/api/v1/projects/${id}`,
			config
		);

		console.log(data);

		dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: data });

		// everytime project details are gathered, store the projectId in localstorage
		localStorage.setItem('projectId', JSON.stringify(data._id));
	} catch (error) {
		dispatch({
			type: PROJECT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * updates a project
 * @param {*} project
 * @param {*} history
 * @returns
 */
export const updateProject =
	(project, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: PROJECT_UPDATE_REQUEST });

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
			const { data } = await axios.put(
				`${getURL()}/api/v1/projects/${project._id}`,
				project,
				config
			);

			dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: data });
			history.go(-1);
			dispatch(setAlert('Project successfully updated', 'success'));
		} catch (error) {
			dispatch({
				type: PROJECT_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

/**
 * updates a project profile picture
 * @param {*} project
 * @param {*} file
 * @param {*} history
 * @returns
 */
export const updateProjectProfilePhoto =
	(project, file, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: PROJECT_UPDATE_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const instructions = getBucketInfo('project');
			instructions.id = project.id;
			instructions.contentType = file.type;

			//get presigned url
			const {
				data: { key, url },
			} = await axios.post(`${getURL()}/api/v1/upload`, instructions, config);

			// upload to AWS
			await axios.put(url, file, {
				'Content-Type': file.type,
			});

			project.image = key;

			//pass id, project, and config file to api
			const { data } = await axios.put(
				`${getURL()}/api/v1/projects/${project.id}/profilePhoto`,
				project,
				config
			);

			dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: data });
			history.go(-1);
			dispatch(setAlert('Project successfully updated', 'success'));
		} catch (error) {
			dispatch({
				type: PROJECT_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

/**
 * deletes a project
 * @param {*} id
 * @returns
 */
export const deleteProject = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PROJECT_DELETE_REQUEST });

		//get logged-in user
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		//pass id, project, and config file to api
		await axios.delete(`${getURL()}/api/v1/projects/${id}`, config);

		dispatch({ type: PROJECT_DELETE_SUCCESS });
		dispatch(setAlert('Project successfully deleted', 'success'));
	} catch (error) {
		dispatch({
			type: PROJECT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * list all projects
 * @param {*} keyword
 * @param {*} pageNumber
 * @returns
 */
export const listProjects =
	(keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: PROJECT_LIST_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			//pass keyword and pageNumber, along with config to api
			const { data } = await axios.get(
				`${getURL()}/api/v1/projects?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: PROJECT_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: PROJECT_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * gets list of projects for user
 * @param {*} id
 * @returns
 */
export const listUserProjects = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PROJECT_USER_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(
			`${getURL()}/api/v1/projects/user/${id}`,
			config
		);

		dispatch({ type: PROJECT_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PROJECT_USER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * assigns user to project
 * @param {*} projectId
 * @param {*} assignments
 * @param {*} history
 * @returns
 */
export const assignProjectUser =
	(projectId, assignments, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: PROJECT_ASSIGNMENT_REQUEST });

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
				`${getURL()}/api/v1/projects/${projectId}/assign`,
				assignments,
				config
			);

			dispatch({ type: PROJECT_ASSIGNMENT_SUCCESS, payload: data });
			history.go(-1);
			dispatch(setAlert('Project successfully updated', 'success'));
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;

			dispatch({
				type: PROJECT_ASSIGNMENT_FAIL,
				payload: message,
			});
		}
	};

/**
 * Saves projectInfo
 * @param {*} data
 * @returns
 */
export const saveProjectInfo = (data) => (dispatch) => {
	dispatch({
		type: PROJECT_SAVE_REQUEST,
		payload: data,
	});
	localStorage.setItem('projectInfo', JSON.stringify(data));
};
