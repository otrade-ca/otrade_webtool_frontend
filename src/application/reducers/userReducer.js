// import constants
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_PROFILE_UPDATE_FAIL,
	USER_PROFILE_UPDATE_RESET,
	USER_LOGOUT,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DETAILS_RESET,
} from '../constants/userConstants';

/**
 * logs in a user
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

/**
 * registers a user
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, success: true, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

/**
 * update my profile
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const userUpdateProfileReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_PROFILE_UPDATE_REQUEST:
			return { ...state, loading: true };
		case USER_PROFILE_UPDATE_SUCCESS:
			return { loading: false, success: true, userInfo: action.payload };
		case USER_PROFILE_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case USER_PROFILE_UPDATE_RESET:
			return { user: {} };
		default:
			return state;
	}
};

/**
 * return a list of users
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const userListReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true, users: [] };
		case USER_LIST_SUCCESS:
			return {
				loading: false,
				users: action.payload.users,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case USER_LIST_FAIL:
			return { loading: false, error: action.payload };
		case USER_LIST_RESET:
			return { users: [] };
		default:
			return state;
	}
};

/**
 * return a users profile information
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { loading: true, ...state };
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case USER_DETAILS_RESET:
			return { user: {} };
		default:
			return state;
	}
};

/**
 * update a user profile
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const userUpdateReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true };
		case USER_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case USER_UPDATE_RESET:
			return { user: {} };
		default:
			return state;
	}
};

/**
 * delete a user
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const userDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return { ...state, loading: true };
		case USER_DELETE_SUCCESS:
			return { loading: false, success: true };
		case USER_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
