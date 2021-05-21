import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import AddOrganizationScreen from '../../screens/organization/AddOrganizationScreen';

const OrganizationRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				exact
				path="/organizations/register/community/:id"
				component={AddOrganizationScreen}
			/>
		</Switch>
	);
};

export default OrganizationRoutes;
