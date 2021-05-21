import React from 'react';
import { Redirect } from 'react-router-dom';

const HomePage = () => {
	//on landing, redirect user to the user profile
	return <Redirect to="/login" />;
};

export default HomePage;
