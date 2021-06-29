/**
 * Project Reducers
 */

// import constants
import {
	PROJECT_LIST_REQUEST,
	PROJECT_LIST_SUCCESS,
	PROJECT_LIST_FAIL,
	PROJECT_DETAILS_REQUEST,
	PROJECT_DETAILS_SUCCESS,
	PROJECT_DETAILS_FAIL,
	PROJECT_DETAILS_RESET,
	PROJECT_UPDATE_REQUEST,
	PROJECT_UPDATE_SUCCESS,
	PROJECT_UPDATE_FAIL,
	PROJECT_UPDATE_RESET,
	PROJECT_DELETE_REQUEST,
	PROJECT_DELETE_SUCCESS,
	PROJECT_DELETE_FAIL,
	PROJECT_USER_REQUEST,
	PROJECT_USER_SUCCESS,
	PROJECT_USER_FAIL,
	PROJECT_ASSIGNMENT_REQUEST,
	PROJECT_ASSIGNMENT_SUCCESS,
	PROJECT_ASSIGNMENT_FAIL,
	PROJECT_ASSIGNMENT_RESET,
	PROJECT_ADD_REQUEST,
	PROJECT_ADD_SUCCESS,
	PROJECT_ADD_FAIL,
	PROJECT_SAVE_REQUEST,
	PROJECT_SAVE_RESET,
	PROJECT_USER_FILTER,
	PROJECT_USER_FILTER_CLEAR,
} from '../constants/projectConstants';

/**
 * Add a project
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const projectAddReducer = (state = {}, action) => {
	switch (action.type) {
		case PROJECT_ADD_REQUEST:
			return { loading: true };
		case PROJECT_ADD_SUCCESS:
			return { loading: false, success: true, project: action.payload };
		case PROJECT_ADD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

/**
 * Get project details
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const projectDetailsReducer = (state = { project: {} }, action) => {
	switch (action.type) {
		case PROJECT_DETAILS_REQUEST:
			return { loading: true, ...state };
		case PROJECT_DETAILS_SUCCESS:
			return {
				loading: false,
				project: action.payload,
				assignees: action.payload.assignees,
			};
		case PROJECT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case PROJECT_DETAILS_RESET:
			return { project: {} };
		default:
			return state;
	}
};

/**
 * Update a project
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const projectUpdateReducer = (state = { project: {} }, action) => {
	switch (action.type) {
		case PROJECT_UPDATE_REQUEST:
			return { loading: true };
		case PROJECT_UPDATE_SUCCESS:
			return { loading: false, success: true, project: action.payload };
		case PROJECT_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case PROJECT_UPDATE_RESET:
			return { project: {} };
		default:
			return state;
	}
};

/**
 * Delete a project
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const projectDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PROJECT_DELETE_REQUEST:
			return { loading: true, ...state };
		case PROJECT_DELETE_SUCCESS:
			return { loading: false, success: true };
		case PROJECT_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

/**
 * Get projects for a user
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const projectUserReducer = (
	state = { projects: [], filtered: [] },
	action
) => {
	switch (action.type) {
		case PROJECT_USER_REQUEST:
			return { loading: true, projects: [] };
		case PROJECT_USER_SUCCESS:
			return { loading: false, projects: action.payload };
		case PROJECT_USER_FAIL:
			return { loading: false, error: action.payload };
		case PROJECT_USER_FILTER:
			return {
				...state,
				filtered: state.projects.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.projectName.match(regex);
				}),
			};
		case PROJECT_USER_FILTER_CLEAR:
			return {
				...state,
				filtered: null,
			};
		default:
			return state;
	}
};

/**
 * Assign user to project
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const projectUserAssignmentReducer = (
	state = { project: {} },
	action
) => {
	switch (action.type) {
		case PROJECT_ASSIGNMENT_REQUEST:
			return { loading: true };
		case PROJECT_ASSIGNMENT_SUCCESS:
			return {
				loading: false,
				success: true,
				project: action.payload,
			};
		case PROJECT_ASSIGNMENT_FAIL:
			return { loading: false, error: action.payload };
		case PROJECT_ASSIGNMENT_RESET:
			return { project: {} };
		default:
			return state;
	}
};

/**
 * list projects
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const projectListReducer = (state = { projects: [] }, action) => {
	switch (action.type) {
		case PROJECT_LIST_REQUEST:
			return { loading: true, projects: [] };
		case PROJECT_LIST_SUCCESS:
			return {
				loading: false,
				projects: action.payload.projects,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case PROJECT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

/**
 * Save project to localstorage
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const projectSaveReducer = (state = { projectInfo: {} }, action) => {
	switch (action.type) {
		case PROJECT_SAVE_REQUEST:
			return { ...state, projectInfo: action.payload };
		case PROJECT_SAVE_RESET:
			return { projectInfo: {} };
		default:
			return state;
	}
};
