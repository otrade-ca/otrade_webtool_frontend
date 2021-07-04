import {
	STAKEHOLDER_ADD_REQUEST,
	STAKEHOLDER_ADD_SUCCESS,
	STAKEHOLDER_ADD_FAIL,
	STAKEHOLDER_ADD_RESET,
	STAKEHOLDER_DETAILS_REQUEST,
	STAKEHOLDER_DETAILS_SUCCESS,
	STAKEHOLDER_DETAILS_FAIL,
	STAKEHOLDER_UPDATE_REQUEST,
	STAKEHOLDER_UPDATE_SUCCESS,
	STAKEHOLDER_UPDATE_FAIL,
	STAKEHOLDER_UPDATE_RESET,
	STAKEHOLDER_DELETE_REQUEST,
	STAKEHOLDER_DELETE_SUCCESS,
	STAKEHOLDER_DELETE_FAIL,
	STAKEHOLDER_DELETE_RESET,
	STAKEHOLDER_USER_LIST_REQUEST,
	STAKEHOLDER_USER_LIST_SUCCESS,
	STAKEHOLDER_USER_LIST_FAIL,
	STAKEHOLDER_USER_LIST_RESET,
	STAKEHOLDER_LOCATION_LIST_REQUEST,
	STAKEHOLDER_LOCATION_LIST_SUCCESS,
	STAKEHOLDER_LOCATION_LIST_FAIL,
	STAKEHOLDER_LOCATION_LIST_RESET,
	STAKEHOLDER_PROJECT_LIST_REQUEST,
	STAKEHOLDER_PROJECT_LIST_SUCCESS,
	STAKEHOLDER_PROJECT_LIST_FAIL,
	STAKEHOLDER_PROJECT_LIST_RESET,
	STAKEHOLDER_ASSIGN_REQUEST,
	STAKEHOLDER_ASSIGN_SUCCESS,
	STAKEHOLDER_ASSIGN_RESET,
	STAKEHOLDER_SAVE_REQUEST,
	STAKEHOLDER_SAVE_RESET,
	STAKEHOLDER_DETAILS_RESET,
	STAKEHOLDER_DROPDOWN_REQUEST,
	STAKEHOLDER_DROPDOWN_SUCCESS,
	STAKEHOLDER_DROPDOWN_FAIL,
	STAKEHOLDER_DROPDOWN_RESET,
} from '../constants/stakeholderConstants';

/**
 * adds stakeholder
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const stakeholderAddReducer = (state = {}, action) => {
	switch (action.type) {
		case STAKEHOLDER_ADD_REQUEST:
			return { loading: true };
		case STAKEHOLDER_ADD_SUCCESS:
			return { loading: false, success: true, stakeholder: action.payload };
		case STAKEHOLDER_ADD_FAIL:
			return { loading: false, error: action.payload };
		case STAKEHOLDER_ADD_RESET:
			return { stakeholder: {} };
		default:
			return state;
	}
};

/**
 * gets stakeholder details
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const stakeholderDetailsReducer = (
	state = { stakeholder: {} },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_DETAILS_REQUEST:
			return { loading: true, ...state };
		case STAKEHOLDER_DETAILS_SUCCESS:
			return { loading: false, success: true, stakeholder: action.payload };
		case STAKEHOLDER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case STAKEHOLDER_DETAILS_RESET:
			return { stakeholder: {} };
		default:
			return state;
	}
};

/**
 * updates a stakeholder
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const stakeholderUpdateReducer = (
	state = { stakeholder: {} },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_UPDATE_REQUEST:
			return { loading: true };
		case STAKEHOLDER_UPDATE_SUCCESS:
			return { loading: false, success: true, stakeholder: action.payload };
		case STAKEHOLDER_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case STAKEHOLDER_UPDATE_RESET:
			return { stakeholder: {} };
		default:
			return state;
	}
};

/**
 * deletes a stakeholder
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const stakeholderDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case STAKEHOLDER_DELETE_REQUEST:
			return { loading: true, ...state };
		case STAKEHOLDER_DELETE_SUCCESS:
			return { loading: false, success: true };
		case STAKEHOLDER_DELETE_FAIL:
			return { loading: false, error: action.payload };
		case STAKEHOLDER_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

/**
 * manages list of stakeholders a user created
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const stakeholderUserListReducer = (
	state = { stakeholders: [] },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_USER_LIST_REQUEST:
			return { loading: true, stakeholders: [] };
		case STAKEHOLDER_USER_LIST_SUCCESS:
			return { loading: false, stakeholders: action.payload };
		case STAKEHOLDER_USER_LIST_FAIL:
			return { loading: false, error: action.payload };
		case STAKEHOLDER_USER_LIST_RESET:
			return { stakeholders: [] };
		default:
			return state;
	}
};

/**
 * manages list of stakeholders belonging to a location
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const stakeholderLocationListReducer = (
	state = { stakeholders: [] },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_LOCATION_LIST_REQUEST:
			return { loading: true, stakeholders: [] };
		case STAKEHOLDER_LOCATION_LIST_SUCCESS:
			return {
				loading: false,
				stakeholders: action.payload.stakeholders,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case STAKEHOLDER_LOCATION_LIST_FAIL:
			return { loading: false, error: action.payload };
		case STAKEHOLDER_LOCATION_LIST_RESET:
			return { stakeholders: [] };
		default:
			return state;
	}
};

/**
 * manages list of stakeholders belonging to a project
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const stakeholderProjectListReducer = (
	state = { stakeholders: [] },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_PROJECT_LIST_REQUEST:
			return { loading: true, stakeholders: [] };
		case STAKEHOLDER_PROJECT_LIST_SUCCESS:
			return {
				loading: false,
				stakeholders: action.payload.stakeholders,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case STAKEHOLDER_PROJECT_LIST_FAIL:
			return { loading: false, error: action.payload };
		case STAKEHOLDER_PROJECT_LIST_RESET:
			return { stakeholders: [] };
		default:
			return state;
	}
};

/**
 * stakeholder dropdown reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const stakeholderListDropdownReducer = (
	state = { stakeholders: [] },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_DROPDOWN_REQUEST:
			return { loading: true, stakeholders: [] };
		case STAKEHOLDER_DROPDOWN_SUCCESS:
			return {
				loading: false,
				stakeholders: action.payload.stakeholders,
			};
		case STAKEHOLDER_DROPDOWN_FAIL:
			return { loading: false, error: action.payload };
		case STAKEHOLDER_DROPDOWN_RESET:
			return { stakeholders: [], filtered: [] };
		default:
			return state;
	}
};

/**
 * manages list of stakeholders to append
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const stakeholderAssignReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case STAKEHOLDER_ASSIGN_REQUEST:
			return { loading: true, ...state };
		case STAKEHOLDER_ASSIGN_SUCCESS:
			return { loading: false, success: true, members: action.payload };
		case STAKEHOLDER_ASSIGN_RESET:
			return { members: [] };
		default:
			return state;
	}
};

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const stakeholderSaveReducer = (
	state = { stakeholderInfo: {} },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_SAVE_REQUEST:
			return { ...state, stakeholderInfo: action.payload };
		case STAKEHOLDER_SAVE_RESET:
			return { stakeholderInfo: {} };
		default:
			return state;
	}
};
