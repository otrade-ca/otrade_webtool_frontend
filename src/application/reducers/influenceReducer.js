import {
	INFLUENCE_ADD_REQUEST,
	INFLUENCE_ADD_SUCCESS,
	INFLUENCE_ADD_FAIL,
	INFLUENCE_ADD_RESET,
	INFLUENCE_DETAILS_REQUEST,
	INFLUENCE_DETAILS_SUCCESS,
	INFLUENCE_DETAILS_FAIL,
	INFLUENCE_DETAILS_RESET,
	INFLUENCE_DELETE_REQUEST,
	INFLUENCE_DELETE_SUCCESS,
	INFLUENCE_DELETE_FAIL,
	INFLUENCE_DELETE_RESET,
	INFLUENCE_LIST_REQUEST,
	INFLUENCE_LIST_SUCCESS,
	INFLUENCE_LIST_FAIL,
	INFLUENCE_LIST_FILTER,
	INFLUENCE_LIST_FILTER_CLEAR,
} from '../constants/influenceConstants';

// add influence reducer
export const influenceAddReducer = (state = {}, action) => {
	switch (action.type) {
		case INFLUENCE_ADD_REQUEST:
			return { loading: true };
		case INFLUENCE_ADD_SUCCESS:
			return { loading: false, success: true, influence: action.payload };
		case INFLUENCE_ADD_FAIL:
			return { loading: false, error: action.payload };
		case INFLUENCE_ADD_RESET:
			return { influence: {} };
		default:
			return state;
	}
};

// get influence details reducer
export const influenceDetailsReducer = (state = { influence: {} }, action) => {
	switch (action.type) {
		case INFLUENCE_DETAILS_REQUEST:
			return { loading: true, ...state };
		case INFLUENCE_DETAILS_SUCCESS:
			return { loading: false, success: true, influence: action.payload };
		case INFLUENCE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case INFLUENCE_DETAILS_RESET:
			return { influence: {} };
		default:
			return state;
	}
};

// delete influence reducer
export const influenceDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case INFLUENCE_DELETE_REQUEST:
			return { loading: true, ...state };
		case INFLUENCE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case INFLUENCE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		case INFLUENCE_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

// get influence list reducer
export const influenceListReducer = (
	state = { influences: [], filtered: [] },
	action
) => {
	switch (action.type) {
		case INFLUENCE_LIST_REQUEST:
			return { loading: true, influences: [] };
		case INFLUENCE_LIST_SUCCESS:
			return { loading: false, influences: action.payload };
		case INFLUENCE_LIST_FAIL:
			return { loading: false, error: action.payload };
		case INFLUENCE_LIST_FILTER:
			return {
				...state,
				filtered: state.influences.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.influences.match(regex);
				}),
			};
		case INFLUENCE_LIST_FILTER_CLEAR:
			return {
				...state,
				filtered: null,
			};
		default:
			return state;
	}
};
