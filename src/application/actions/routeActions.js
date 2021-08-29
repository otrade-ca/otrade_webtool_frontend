import {
	ROUTE_SAVE_REQUEST,
	ROUTE_SAVE_RESET,
	BREADCRUMB_SAVE_REQUEST,
	BREADCRUMB_SAVE_RESET,
} from '../constants/routeConstants';

/**
 * saves routeInfo
 * @param {*} data
 * @returns
 */
export const saveRouteInfo = (data) => (dispatch) => {
	dispatch({
		type: ROUTE_SAVE_REQUEST,
		payload: data,
	});
};

/**
 * removes routeInfo
 * @returns
 */
export const removeRouteInfo = () => (dispatch) => {
	dispatch({ type: ROUTE_SAVE_RESET });
};

/**
 * saves a breadcrumb
 * @param {*} data
 * @returns
 */
export const saveBreadcrumb = (bCArr, pathName) => (dispatch) => {
	// split url by /
	const pArr = pathName.split('/').filter((x) => x);
	const pArrStr1 = pArr[0];
	const pArrStr2 = pArr[1];

	// get first item in pArr
	const pName = pArr[0];
	// construct obj
	const breadCrumb = { path: pathName, name: pName };
	// get new array
	let newArr = [...bCArr];

	if (newArr.length === 0) {
		newArr.push(breadCrumb);
	}

	// if newArr length > 0
	if (newArr.length > 0) {
		// see if pathname prefix {project, community, stakeholder, etc.}
		// is already in array, get index
		const elementIndex = newArr.findIndex((item) => {
			const cmpStr = item.path.split('/').filter((x) => x); // return defined elements only
			const cmpStr1 = cmpStr[0];
			return cmpStr1 === pArrStr1;
		});

		// if not -1, it exists
		if (elementIndex !== -1) {
			// get the item
			const arrStrCmp = newArr[elementIndex].path.split('/').filter((x) => x);
			const arrStr2 = arrStrCmp[1];
			// check if 2nd elements are the same
			if (arrStr2 !== pArrStr2) {
				// if not the same, add
				if (newArr.length === 1) {
					newArr.pop();
					newArr.push(breadCrumb);
				}
				// create a new array from 0 to index of element used to compare against pathname
				newArr = newArr.slice(0, elementIndex);
				// replace the element with pathname breadcrumb
				newArr[elementIndex] = breadCrumb;
			}
		} else {
			newArr.push(breadCrumb);
		}
	}

	dispatch({
		type: BREADCRUMB_SAVE_REQUEST,
		payload: newArr,
	});
};

/**
 * removes breadcrumbs
 * @returns
 */
export const removeBreadcrumb = () => (dispatch) => {
	dispatch({ type: BREADCRUMB_SAVE_RESET });
};
