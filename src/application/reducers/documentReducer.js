import {
	DOCUMENT_ADD_REQUEST,
	DOCUMENT_ADD_SUCCESS,
	DOCUMENT_ADD_FAIL,
	DOCUMENT_ADD_RESET,
	DOCUMENT_DELETE_REQUEST,
	DOCUMENT_DELETE_SUCCESS,
	DOCUMENT_DELETE_FAIL,
	DOCUMENT_DELETE_RESET,
	DOCUMENT_DETAILS_REQUEST,
	DOCUMENT_DETAILS_SUCCESS,
	DOCUMENT_DETAILS_FAIL,
	DOCUMENT_DETAILS_RESET,
	DOCUMENT_UPDATE_REQUEST,
	DOCUMENT_UPDATE_SUCCESS,
	DOCUMENT_UPDATE_FAIL,
	DOCUMENT_UPDATE_RESET,
	DOCUMENT_LIST_PROJECT_REQUEST,
	DOCUMENT_LIST_PROJECT_SUCCESS,
	DOCUMENT_LIST_PROJECT_FAIL,
	DOCUMENT_LIST_PROJECT_RESET,
	DOCUMENT_LIST_LOCATION_REQUEST,
	DOCUMENT_LIST_LOCATION_SUCCESS,
	DOCUMENT_LIST_LOCATION_FAIL,
	DOCUMENT_LIST_LOCATION_RESET,
	DOCUMENT_LIST_STAKEHOLDER_REQUEST,
	DOCUMENT_LIST_STAKEHOLDER_SUCCESS,
	DOCUMENT_LIST_STAKEHOLDER_FAIL,
	DOCUMENT_LIST_STAKEHOLDER_RESET,
	DOCUMENT_LIST_ORGANIZATION_REQUEST,
	DOCUMENT_LIST_ORGANIZATION_SUCCESS,
	DOCUMENT_LIST_ORGANIZATION_FAIL,
	DOCUMENT_LIST_ORGANIZATION_RESET,
} from '../constants/documentConstants';

/**
 *  add document reducer
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const documentAddReducer = (state = {}, action) => {
	switch (action.type) {
		case DOCUMENT_ADD_REQUEST:
			return { loading: true };
		case DOCUMENT_ADD_SUCCESS:
			return { loading: false, success: true, document: action.payload };
		case DOCUMENT_ADD_FAIL:
			return { loading: false, error: action.payload };
		case DOCUMENT_ADD_RESET:
			return { state: {} };
		default:
			return state;
	}
};

/**
 * get document details reducer
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const documentDetailsReducer = (state = { document: {} }, action) => {
	switch (action.type) {
		case DOCUMENT_DETAILS_REQUEST:
			return { loading: true, ...state };
		case DOCUMENT_DETAILS_SUCCESS:
			return { loading: false, document: action.payload.document };
		case DOCUMENT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case DOCUMENT_DETAILS_RESET:
			return { document: {} };
		default:
			return state;
	}
};

/**
 * update document reducer
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const documentUpdateReducer = (state = { document: {} }, action) => {
	switch (action.type) {
		case DOCUMENT_UPDATE_REQUEST:
			return { loading: true };
		case DOCUMENT_UPDATE_SUCCESS:
			return { loading: false, success: true, document: action.payload };
		case DOCUMENT_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case DOCUMENT_UPDATE_RESET:
			return { document: {} };
		default:
			return state;
	}
};

/**
 * delete document reducer
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const documentDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DOCUMENT_DELETE_REQUEST:
			return { loading: true, ...state };
		case DOCUMENT_DELETE_SUCCESS:
			return { loading: false, success: true };
		case DOCUMENT_DELETE_FAIL:
			return { loading: false, error: action.payload };
		case DOCUMENT_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

/**
 * document list reducer for a project
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const documentListProjectReducer = (
	state = { documents: [] },
	action
) => {
	switch (action.type) {
		case DOCUMENT_LIST_PROJECT_REQUEST:
			return { loading: true, DOCUMENT: [] };
		case DOCUMENT_LIST_PROJECT_SUCCESS:
			return {
				loading: false,
				documents: action.payload.documents,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case DOCUMENT_LIST_PROJECT_FAIL:
			return { loading: false, error: action.payload };
		case DOCUMENT_LIST_PROJECT_RESET:
			return { documents: [] };
		default:
			return state;
	}
};

/**
 * document list reducer for a community
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const documentListLocationReducer = (
	state = { documents: [] },
	action
) => {
	switch (action.type) {
		case DOCUMENT_LIST_LOCATION_REQUEST:
			return { loading: true, documents: [] };
		case DOCUMENT_LIST_LOCATION_SUCCESS:
			return {
				loading: false,
				documents: action.payload.documents,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case DOCUMENT_LIST_LOCATION_FAIL:
			return { loading: false, error: action.payload };
		case DOCUMENT_LIST_LOCATION_RESET:
			return { documents: [] };
		default:
			return state;
	}
};

/**
 * documents list reducer for a stakeholder
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const documentListStakeholderReducer = (
	state = { documents: [] },
	action
) => {
	switch (action.type) {
		case DOCUMENT_LIST_STAKEHOLDER_REQUEST:
			return { loading: true, documents: [] };
		case DOCUMENT_LIST_STAKEHOLDER_SUCCESS:
			return {
				loading: false,
				documents: action.payload.documents,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case DOCUMENT_LIST_STAKEHOLDER_FAIL:
			return { loading: false, error: action.payload };
		case DOCUMENT_LIST_STAKEHOLDER_RESET:
			return { documents: [] };
		default:
			return state;
	}
};

/**
 * documents list reducer for an organization
 * @param {*} state
 * @param {*} action
 * @returns state
 */
export const documentListOrganizationReducer = (
	state = { documents: [] },
	action
) => {
	switch (action.type) {
		case DOCUMENT_LIST_ORGANIZATION_REQUEST:
			return { loading: true, documents: [] };
		case DOCUMENT_LIST_ORGANIZATION_SUCCESS:
			return {
				loading: false,
				documents: action.payload.documents,
				pages: action.payload.pages,
				page: action.payload.page,
				count: action.payload.count,
			};
		case DOCUMENT_LIST_ORGANIZATION_FAIL:
			return { loading: false, error: action.payload };
		case DOCUMENT_LIST_ORGANIZATION_RESET:
			return { documents: [] };
		default:
			return state;
	}
};
