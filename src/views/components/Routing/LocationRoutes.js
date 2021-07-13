import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import { LocationAdd, LandingPage } from '../../screens/location/location';

const LocationRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				path="/communities/register/project/:id"
				component={LocationAdd}
			/>
			<PrivateRoute path="/community/:id" component={LandingPage} />
		</Switch>
	);
};

export default LocationRoutes;
