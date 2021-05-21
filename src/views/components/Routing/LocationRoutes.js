import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import { FormAdd, LandingPage } from '../../screens/location/location';

const LocationRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				path="/communities/register/project/:id"
				component={FormAdd}
			/>
			<PrivateRoute path="/community/:id" component={LandingPage} />
		</Switch>
	);
};

export default LocationRoutes;
