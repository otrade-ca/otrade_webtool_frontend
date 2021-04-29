export const getURL = () => {
	if (process.env.NODE_ENV === 'development') {
		return '';
	}

	return 'https://otradewebapp.herokuapp.com';
};
