import {
	LOCATION_ADD_REQUEST,
	LOCATION_ADD_SUCCESS,
	LOCATION_ADD_FAIL,
	LOCATION_ADD_RESET,
	LOCATION_DETAILS_REQUEST,
	LOCATION_DETAILS_SUCCESS,
	LOCATION_DETAILS_FAIL,
	LOCATION_UPDATE_REQUEST,
	LOCATION_UPDATE_SUCCESS,
	LOCATION_UPDATE_FAIL,
	LOCATION_UPDATE_RESET,
	LOCATION_DELETE_REQUEST,
	LOCATION_DELETE_SUCCESS,
	LOCATION_DELETE_FAIL,
	LOCATION_DELETE_RESET,
	LOCATION_LIST_REQUEST,
	LOCATION_LIST_SUCCESS,
	LOCATION_LIST_FAIL,
	LOCATION_USER_LIST_REQUEST,
	LOCATION_USER_LIST_SUCCESS,
	LOCATION_USER_LIST_FAIL,
	LOCATION_DETAILS_RESET,
	LOCATION_DROPDOWN_REQUEST,
	LOCATION_DROPDOWN_SUCCESS,
	LOCATION_DROPDOWN_FAIL,
	LOCATION_LIST_DROPDOWN_REQUEST,
	LOCATION_LIST_DROPDOWN_SUCCESS,
	LOCATION_LIST_DROPDOWN_FAIL,
	LOCATION_ASSIGN_REQUEST,
	LOCATION_ASSIGN_SUCCESS,
	LOCATION_ASSIGN_RESET,
	LOCATION_LIST_ASSIGN_REQUEST,
	LOCATION_LIST_ASSIGN_SUCCESS,
	LOCATION_LIST_ASSIGN_RESET,
} from '../constants/locationConstants';

/**
 * Add location reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const locationAddReducer = (state = {}, action) => {
	switch (action.type) {
		case LOCATION_ADD_REQUEST:
			return { loading: true };
		case LOCATION_ADD_SUCCESS:
			return { loading: false, success: true, location: action.payload };
		case LOCATION_ADD_FAIL:
			return { loading: false, error: action.payload };
		case LOCATION_ADD_RESET:
			return { state: {} };
		default:
			return state;
	}
};

/**
 * get location details reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const locationDetailsReducer = (state = { location: {} }, action) => {
	switch (action.type) {
		case LOCATION_DETAILS_REQUEST:
			return { loading: true };
		case LOCATION_DETAILS_SUCCESS:
			return { loading: false, success: true, location: action.payload };
		case LOCATION_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case LOCATION_DETAILS_RESET:
			return { location: {} };
		default:
			return state;
	}
};

/**
 * updates location reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const locationUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case LOCATION_UPDATE_REQUEST:
			return { loading: true };
		case LOCATION_UPDATE_SUCCESS:
			return { loading: false, success: true, location: action.payload };
		case LOCATION_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case LOCATION_UPDATE_RESET:
			return { location: {} };
		default:
			return state;
	}
};

/**
 * deletes location reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const locationDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case LOCATION_DELETE_REQUEST:
			return { loading: true, ...state };
		case LOCATION_DELETE_SUCCESS:
			return { loading: false, success: true };
		case LOCATION_DELETE_FAIL:
			return { loading: false, error: action.payload };
		case LOCATION_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

// get list of project locations reducer
export const locationListReducer = (
	state = { locations: [], filtered: [] },
	action
) => {
	switch (action.type) {
		case LOCATION_LIST_REQUEST:
			return { loading: true, locations: [] };
		case LOCATION_LIST_SUCCESS:
			return {
				loading: false,
				locations: action.payload.locations,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case LOCATION_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

/**
 * get list of user locations reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const locationUserListReducer = (
	state = { locations: [], filtered: [] },
	action
) => {
	switch (action.type) {
		case LOCATION_USER_LIST_REQUEST:
			return { loading: true, locations: [] };
		case LOCATION_USER_LIST_SUCCESS:
			return { loading: false, locations: action.payload };
		case LOCATION_USER_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

/**
 * get list of locations for dropdown
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const locationListDropdownReducer = (
	state = { locations: [] },
	action
) => {
	switch (action.type) {
		case LOCATION_LIST_DROPDOWN_REQUEST:
			return { loading: true, locations: [] };
		case LOCATION_LIST_DROPDOWN_SUCCESS:
			return {
				loading: false,
				locations: action.payload.locations,
			};
		case LOCATION_LIST_DROPDOWN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

/**
 * get a location for dropdown
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const locationDropdownReducer = (state = { location: {} }, action) => {
	switch (action.type) {
		case LOCATION_DROPDOWN_REQUEST:
			return { loading: true, location: {} };
		case LOCATION_DROPDOWN_SUCCESS:
			return {
				loading: false,
				location: action.payload.location,
			};
		case LOCATION_DROPDOWN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

/**
 * assigns locations to a project reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const locationsAssignReducer = (state = { locations: [] }, action) => {
	switch (action.type) {
		case LOCATION_LIST_ASSIGN_REQUEST:
			return { loading: true, ...state };
		case LOCATION_LIST_ASSIGN_SUCCESS:
			return {
				loading: false,
				success: true,
				locations: action.payload,
			};
		case LOCATION_LIST_ASSIGN_RESET:
			return { locations: [] };
		default:
			return state;
	}
};

/**
 * assigns locations to a project reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const locationAssignReducer = (state = { location: {} }, action) => {
	switch (action.type) {
		case LOCATION_ASSIGN_REQUEST:
			return { loading: true, ...state };
		case LOCATION_ASSIGN_SUCCESS:
			return {
				loading: false,
				success: true,
				location: action.payload,
			};
		case LOCATION_ASSIGN_RESET:
			return { location: {} };
		default:
			return state;
	}
};
