export const getLocationId = () => {
	return localStorage.getItem('locationId')
		? JSON.parse(localStorage.getItem('locationId'))
		: null;
};

export const getProjectId = () => {
	return localStorage.getItem('projectId')
		? JSON.parse(localStorage.getItem('projectId'))
		: null;
};
