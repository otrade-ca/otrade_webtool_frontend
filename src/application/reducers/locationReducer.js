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
	LOCATION_LIST_FILTER,
	LOCATION_LIST_FILTER_CLEAR,
	LOCATION_USER_LIST_FILTER,
	LOCATION_USER_LIST_FILTER_CLEAR,
} from '../constants/locationConstants';

// add location
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

// get location details
export const locationDetailsReducer = (state = { location: {} }, action) => {
	switch (action.type) {
		case LOCATION_DETAILS_REQUEST:
			return { loading: true };
		case LOCATION_DETAILS_SUCCESS:
			return { loading: false, success: true, location: action.payload };
		case LOCATION_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// update location
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

// delete location
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

// get list of locations
export const locationListReducer = (
	state = { locations: [], filtered: [] },
	action
) => {
	switch (action.type) {
		case LOCATION_LIST_REQUEST:
			return { loading: true, locations: [] };
		case LOCATION_LIST_SUCCESS:
			return { loading: false, locations: action.payload };
		case LOCATION_LIST_FAIL:
			return { loading: false, error: action.payload };
		case LOCATION_LIST_FILTER:
			return {
				...state,
				filtered: state.locations.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.location.match(regex);
				}),
			};
		case LOCATION_LIST_FILTER_CLEAR:
			return {
				...state,
				filtered: null,
			};
		default:
			return state;
	}
};

// get list of locations
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
		case LOCATION_USER_LIST_FILTER:
			return {
				...state,
				filtered: state.locations.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.location.match(regex);
				}),
			};
		case LOCATION_USER_LIST_FILTER_CLEAR:
			return {
				...state,
				filtered: null,
			};
		default:
			return state;
	}
};
