import {
	NEWS_ADD_REQUEST,
	NEWS_ADD_SUCCESS,
	NEWS_ADD_FAIL,
	NEWS_ADD_RESET,
	NEWS_DELETE_REQUEST,
	NEWS_DELETE_SUCCESS,
	NEWS_DELETE_FAIL,
	NEWS_DELETE_RESET,
	NEWS_DETAILS_REQUEST,
	NEWS_DETAILS_SUCCESS,
	NEWS_DETAILS_FAIL,
	NEWS_DETAILS_RESET,
	NEWS_UPDATE_REQUEST,
	NEWS_UPDATE_SUCCESS,
	NEWS_UPDATE_FAIL,
	NEWS_UPDATE_RESET,
	NEWS_LIST_PROJECT_REQUEST,
	NEWS_LIST_PROJECT_SUCCESS,
	NEWS_LIST_PROJECT_FAIL,
	NEWS_LIST_PROJECT_RESET,
	NEWS_LIST_LOCATION_REQUEST,
	NEWS_LIST_LOCATION_SUCCESS,
	NEWS_LIST_LOCATION_FAIL,
	NEWS_LIST_LOCATION_RESET,
	NEWS_LIST_STAKEHOLDER_REQUEST,
	NEWS_LIST_STAKEHOLDER_SUCCESS,
	NEWS_LIST_STAKEHOLDER_FAIL,
	NEWS_LIST_STAKEHOLDER_RESET,
	NEWS_LIST_ORGANIZATION_REQUEST,
	NEWS_LIST_ORGANIZATION_SUCCESS,
	NEWS_LIST_ORGANIZATION_FAIL,
	NEWS_LIST_ORGANIZATION_RESET,
} from '../constants/newsConstants';

/**
 *  add news reducer
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const newsAddReducer = (state = {}, action) => {
	switch (action.type) {
		case NEWS_ADD_REQUEST:
			return { loading: true };
		case NEWS_ADD_SUCCESS:
			return { loading: false, success: true, news: action.payload };
		case NEWS_ADD_FAIL:
			return { loading: false, error: action.payload };
		case NEWS_ADD_RESET:
			return { state: {} };
		default:
			return state;
	}
};

/**
 * get news details reducer
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const newsDetailsReducer = (state = { news: {} }, action) => {
	switch (action.type) {
		case NEWS_DETAILS_REQUEST:
			return { loading: true, ...state };
		case NEWS_DETAILS_SUCCESS:
			return { loading: false, news: action.payload.news };
		case NEWS_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case NEWS_DETAILS_RESET:
			return { news: {} };
		default:
			return state;
	}
};

/**
 * update news reducer
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const newsUpdateReducer = (state = { news: {} }, action) => {
	switch (action.type) {
		case NEWS_UPDATE_REQUEST:
			return { loading: true };
		case NEWS_UPDATE_SUCCESS:
			return { loading: false, success: true, news: action.payload };
		case NEWS_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case NEWS_UPDATE_RESET:
			return { news: {} };
		default:
			return state;
	}
};

/**
 * delete news reducer
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const newsDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case NEWS_DELETE_REQUEST:
			return { loading: true, ...state };
		case NEWS_DELETE_SUCCESS:
			return { loading: false, success: true };
		case NEWS_DELETE_FAIL:
			return { loading: false, error: action.payload };
		case NEWS_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

/**
 * news list reducer for a project
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const newsListProjectReducer = (state = { news: [] }, action) => {
	switch (action.type) {
		case NEWS_LIST_PROJECT_REQUEST:
			return { loading: true, news: [] };
		case NEWS_LIST_PROJECT_SUCCESS:
			return {
				loading: false,
				news: action.payload.news,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case NEWS_LIST_PROJECT_FAIL:
			return { loading: false, error: action.payload };
		case NEWS_LIST_PROJECT_RESET:
			return { news: [] };
		default:
			return state;
	}
};

/**
 * news list reducer for a community
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const newsListLocationReducer = (state = { news: [] }, action) => {
	switch (action.type) {
		case NEWS_LIST_LOCATION_REQUEST:
			return { loading: true, news: [] };
		case NEWS_LIST_LOCATION_SUCCESS:
			return {
				loading: false,
				news: action.payload.news,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case NEWS_LIST_LOCATION_FAIL:
			return { loading: false, error: action.payload };
		case NEWS_LIST_LOCATION_RESET:
			return { news: [] };
		default:
			return state;
	}
};

/**
 * news list reducer for a stakeholder
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const newsListStakeholderReducer = (state = { news: [] }, action) => {
	switch (action.type) {
		case NEWS_LIST_STAKEHOLDER_REQUEST:
			return { loading: true, news: [] };
		case NEWS_LIST_STAKEHOLDER_SUCCESS:
			return {
				loading: false,
				news: action.payload.news,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case NEWS_LIST_STAKEHOLDER_FAIL:
			return { loading: false, error: action.payload };
		case NEWS_LIST_STAKEHOLDER_RESET:
			return { news: [] };
		default:
			return state;
	}
};

/**
 * news list reducer for an organization
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const newsListOrganizationReducer = (state = { news: [] }, action) => {
	switch (action.type) {
		case NEWS_LIST_ORGANIZATION_REQUEST:
			return { loading: true, news: [] };
		case NEWS_LIST_ORGANIZATION_SUCCESS:
			return { loading: false, news: action.payload };
		case NEWS_LIST_ORGANIZATION_FAIL:
			return { loading: false, error: action.payload };
		case NEWS_LIST_ORGANIZATION_RESET:
			return { news: [] };
		default:
			return state;
	}
};
