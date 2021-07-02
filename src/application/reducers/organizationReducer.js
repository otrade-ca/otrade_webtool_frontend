import {
	ORGANIZATION_ADD_REQUEST,
	ORGANIZATION_ADD_SUCCESS,
	ORGANIZATION_ADD_FAIL,
	ORGANIZATION_ADD_RESET,
	ORGANIZATION_DETAILS_REQUEST,
	ORGANIZATION_DETAILS_SUCCESS,
	ORGANIZATION_DETAILS_FAIL,
	ORGANIZATION_DETAILS_RESET,
	ORGANIZATION_UPDATE_REQUEST,
	ORGANIZATION_UPDATE_SUCCESS,
	ORGANIZATION_UPDATE_FAIL,
	ORGANIZATION_UPDATE_RESET,
	ORGANIZATION_DELETE_REQUEST,
	ORGANIZATION_DELETE_SUCCESS,
	ORGANIZATION_DELETE_FAIL,
	ORGANIZATION_DELETE_RESET,
	ORGANIZATION_PROJECT_LIST_REQUEST,
	ORGANIZATION_PROJECT_LIST_SUCCESS,
	ORGANIZATION_PROJECT_LIST_FAIL,
	ORGANIZATION_LOCATION_LIST_REQUEST,
	ORGANIZATION_LOCATION_LIST_SUCCESS,
	ORGANIZATION_LOCATION_LIST_FAIL,
	ORGANIZATION_STAKEHOLDER_LIST_REQUEST,
	ORGANIZATION_STAKEHOLDER_LIST_SUCCESS,
	ORGANIZATION_STAKEHOLDER_LIST_FAIL,
	ORGANIZATION_ASSIGNMENT_REQUEST,
	ORGANIZATION_ASSIGNMENT_SUCCESS,
	ORGANIZATION_ASSIGNMENT_FAIL,
	ORGANIZATION_ASSIGNMENT_RESET,
	ORGANIZATION_DROPDOWN_REQUEST,
	ORGANIZATION_DROPDOWN_SUCCESS,
	ORGANIZATION_DROPDOWN_FAIL,
} from '../constants/organizationConstants';

/**
 * add organization reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const organizationAddReducer = (state = {}, action) => {
	switch (action.type) {
		case ORGANIZATION_ADD_REQUEST:
			return { loading: true };
		case ORGANIZATION_ADD_SUCCESS:
			return { loading: false, success: true, organization: action.payload };
		case ORGANIZATION_ADD_FAIL:
			return { loading: false, error: action.payload };
		case ORGANIZATION_ADD_RESET:
			return { organization: {} };
		default:
			return state;
	}
};

/**
 * get organization details reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const organizationDetailsReducer = (
	state = { organization: {} },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_DETAILS_REQUEST:
			return { loading: true, ...state };
		case ORGANIZATION_DETAILS_SUCCESS:
			return { loading: false, organization: action.payload };
		case ORGANIZATION_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case ORGANIZATION_DETAILS_RESET:
			return { organization: {} };
		default:
			return state;
	}
};

/**
 * update organization reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const organizationUpdateReducer = (
	state = { organization: {} },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_UPDATE_REQUEST:
			return { loading: true };
		case ORGANIZATION_UPDATE_SUCCESS:
			return { loading: false, success: true, organization: action.payload };
		case ORGANIZATION_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case ORGANIZATION_UPDATE_RESET:
			return { organization: {} };
		default:
			return state;
	}
};

/**
 * delete organization reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const organizationDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ORGANIZATION_DELETE_REQUEST:
			return { loading: true, ...state };
		case ORGANIZATION_DELETE_SUCCESS:
			return { loading: false, success: true };
		case ORGANIZATION_DELETE_FAIL:
			return { loading: false, error: action.payload };
		case ORGANIZATION_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

/**
 * get project organizations reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const organizationProjectListReducer = (
	state = { organizations: [] },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_PROJECT_LIST_REQUEST:
			return { loading: true, organizations: [] };
		case ORGANIZATION_PROJECT_LIST_SUCCESS:
			return {
				loading: false,
				organizations: action.payload.organizations,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case ORGANIZATION_PROJECT_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

/**
 * get location organizations reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const organizationLocationListReducer = (
	state = { organizations: [] },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_LOCATION_LIST_REQUEST:
			return { loading: true, organizations: [] };
		case ORGANIZATION_LOCATION_LIST_SUCCESS:
			return {
				loading: false,
				organizations: action.payload.organizations,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case ORGANIZATION_LOCATION_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

/**
 * get stakeholder organizations reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const organizationStakeholderListReducer = (
	state = { organizations: [] },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_STAKEHOLDER_LIST_REQUEST:
			return { loading: true, organizations: [] };
		case ORGANIZATION_STAKEHOLDER_LIST_SUCCESS:
			return {
				loading: false,
				organizations: action.payload.organizations,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case ORGANIZATION_STAKEHOLDER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

/**
 * assign organization reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const organizationAssignmentReducer = (
	state = { organizations: [] },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_ASSIGNMENT_REQUEST:
			return { loading: true, ...state };
		case ORGANIZATION_ASSIGNMENT_SUCCESS:
			return {
				loading: false,
				success: true,
				organizations: action.payload,
			};
		case ORGANIZATION_ASSIGNMENT_FAIL:
			return { loading: false, error: action.payload };
		case ORGANIZATION_ASSIGNMENT_RESET:
			return { organizations: [] };
		default:
			return state;
	}
};

/**
 * organization dropdown reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const organizationDropdownReducer = (
	state = { organizations: [] },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_DROPDOWN_REQUEST:
			return { loading: true, organizations: [] };
		case ORGANIZATION_DROPDOWN_SUCCESS:
			return {
				loading: false,
				organizations: action.payload.organizations,
			};
		case ORGANIZATION_DROPDOWN_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
