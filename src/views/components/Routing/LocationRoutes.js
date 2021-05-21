import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import LocationForm from '../../screens/location/LocationForm';
import LocationScreen from '../../screens/location/LocationScreen';

const LocationRoutes = () => {
	return (
		<Switch>
			<PrivateRoute path="/communities/register" component={LocationForm} />
			<PrivateRoute path="/community/:id" component={LocationScreen} />
		</Switch>
	);
};

export default LocationRoutes;
