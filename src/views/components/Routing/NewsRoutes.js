import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import NewsForm from '../../screens/news/NewsForm';

const NewsRoutes = () => {
	return (
		<Switch>
			<PrivateRoute path="/news/register/project/:id" component={NewsForm} />
		</Switch>
	);
};

export default NewsRoutes;
