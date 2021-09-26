import axios from 'axios';
import {
	DOCUMENT_ADD_REQUEST,
	DOCUMENT_ADD_SUCCESS,
	DOCUMENT_ADD_FAIL,
	DOCUMENT_DELETE_REQUEST,
	DOCUMENT_DELETE_SUCCESS,
	DOCUMENT_DELETE_FAIL,
	DOCUMENT_DETAILS_REQUEST,
	DOCUMENT_DETAILS_SUCCESS,
	DOCUMENT_DETAILS_FAIL,
	DOCUMENT_UPDATE_REQUEST,
	DOCUMENT_UPDATE_SUCCESS,
	DOCUMENT_UPDATE_FAIL,
	DOCUMENT_LIST_PROJECT_REQUEST,
	DOCUMENT_LIST_PROJECT_SUCCESS,
	DOCUMENT_LIST_PROJECT_FAIL,
	DOCUMENT_LIST_LOCATION_REQUEST,
	DOCUMENT_LIST_LOCATION_SUCCESS,
	DOCUMENT_LIST_LOCATION_FAIL,
	DOCUMENT_LIST_STAKEHOLDER_REQUEST,
	DOCUMENT_LIST_STAKEHOLDER_SUCCESS,
	DOCUMENT_LIST_STAKEHOLDER_FAIL,
	DOCUMENT_LIST_ORGANIZATION_REQUEST,
	DOCUMENT_LIST_ORGANIZATION_SUCCESS,
	DOCUMENT_LIST_ORGANIZATION_FAIL,
} from '../constants/documentConstants';
import { setAlert } from '../actions/alertActions';
import { getBucketInfo, getURL } from '../api';

/**
 * adds a document
 * @param {*} document
 * @param {*} history
 * @returns
 */
export const addProjectDocument =
	(document, file, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: DOCUMENT_ADD_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			// instructions
			const instructions = getBucketInfo('document');
			instructions.id = document.id;
			instructions.contentType = file.type;
			//get presignedUrl
			const {
				data: { key, url },
			} = await axios.post(`${getURL()}/api/v1/upload`, instructions, config);
			// upload to aws
			await axios.put(url, file, { 'Content-Type': file.type });
			// append link to document
			document.link = key;
			//post document to db
			const { data } = await axios.post(
				`${getURL()}/api/v1/documents`,
				document,
				config
			);

			dispatch({ type: DOCUMENT_ADD_SUCCESS, payload: data });
			history.go(-1);
			dispatch(setAlert('Document successfully added', 'success'));
		} catch (error) {
			dispatch({
				type: DOCUMENT_ADD_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * adds a document
 * @param {*} document
 * @param {*} history
 * @returns
 */
export const addCommunityDocument =
	(document, file, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: DOCUMENT_ADD_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			// instructions
			const instructions = getBucketInfo('document');
			instructions.id = document.id;
			instructions.contentType = file.type;

			// get presignedUrl
			const {
				data: { key, url },
			} = await axios.post(`${getURL()}/api/v1/upload`, instructions, config);

			// upload to aws
			await axios.put(url, file, { 'Content-Type': file.type });

			// append link to document
			document.link = key;

			// post document to db
			const { data } = await axios.post(
				`${getURL()}/api/v1/documents`,
				document,
				config
			);

			dispatch({ type: DOCUMENT_ADD_SUCCESS, payload: data });
			history.go(-1);
			dispatch(setAlert('Document successfully added', 'success'));
		} catch (error) {
			dispatch({
				type: DOCUMENT_ADD_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * adds a document
 * @param {*} document
 * @param {*} history
 * @returns
 */
export const addStakeholderDocument =
	(document, file, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: DOCUMENT_ADD_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			// instructions
			const instructions = getBucketInfo('document');
			instructions.id = document.id;
			instructions.contentType = file.type;

			// get presignedUrl
			const {
				data: { key, url },
			} = await axios.post(`${getURL()}/api/v1/upload`, instructions, config);

			// upload to aws
			await axios.put(url, file, { 'Content-Type': file.type });

			// append link to document
			document.link = key;

			// post document to db
			const { data } = await axios.post(
				`${getURL()}/api/v1/documents`,
				document,
				config
			);

			dispatch({ type: DOCUMENT_ADD_SUCCESS, payload: data });
			history.go(-1);
			dispatch(setAlert('Document successfully added', 'success'));
		} catch (error) {
			dispatch({
				type: DOCUMENT_ADD_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * gets a document details
 * @param {*} id
 * @returns
 */
export const getDocumentDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DOCUMENT_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(
			`${getURL()}/api/v1/documents/${id}`,
			config
		);

		dispatch({ type: DOCUMENT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: DOCUMENT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * updates a document
 * @param {*} document
 * @param {*} id
 * @param {*} history
 * @returns
 */
export const updateDocument =
	(document, id, history) => async (dispatch, getState) => {
		try {
			dispatch({ type: DOCUMENT_UPDATE_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.post(
				`${getURL()}/api/v1/documents/${id}`,
				document,
				config
			);

			dispatch({ type: DOCUMENT_UPDATE_SUCCESS, payload: data });
			history.go(-1);
			dispatch('Document successfully updated', 'success');
		} catch (error) {
			dispatch({
				type: DOCUMENT_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * delets a document
 * @param {*} id
 * @returns
 */
export const deleteDocument = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DOCUMENT_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.post(`${getURL()}/api/v1/documents/${id}`, config);

		dispatch({ type: DOCUMENT_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: DOCUMENT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

/**
 * gets all documents belonging to a project
 * @param {*} projectId
 * @param {*} keyword
 * @param {*} pageNumber
 * @returns
 */
export const listProjectDocuments =
	(projectId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: DOCUMENT_LIST_PROJECT_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/projects/${projectId}/documents?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			console.log('returned data', data);

			dispatch({ type: DOCUMENT_LIST_PROJECT_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: DOCUMENT_LIST_PROJECT_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * list all location documents
 * @param {*} locationId
 * @param {*} keyword
 * @param {*} pageNumber
 * @returns
 */
export const listLocationDocuments =
	(locationId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: DOCUMENT_LIST_LOCATION_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/locations/${locationId}/documents?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: DOCUMENT_LIST_LOCATION_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: DOCUMENT_LIST_LOCATION_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * list all organization documents
 * @param {*} organizationId
 * @param {*} keyword
 * @param {*} pageNumber
 * @returns
 */
export const listOrganizationDocuments =
	(organizationId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: DOCUMENT_LIST_ORGANIZATION_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/organizations/${organizationId}/documents?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: DOCUMENT_LIST_ORGANIZATION_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: DOCUMENT_LIST_ORGANIZATION_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};

/**
 * list all stakeholder documents
 * @param {*} stakeholderId
 * @param {*} keyword
 * @param {*} pageNumber
 * @returns
 */
export const listStakeholderDocuments =
	(stakeholderId, keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: DOCUMENT_LIST_STAKEHOLDER_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${getURL()}/api/v1/stakeholders/${stakeholderId}/documents?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: DOCUMENT_LIST_STAKEHOLDER_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: DOCUMENT_LIST_STAKEHOLDER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.messsage,
			});
		}
	};
