import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import AddOrganizationScreen from '../../screens/organization/AddOrganizationScreen';
import Landing from '../../screens/organization/Landing';

const OrganizationRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				exact
				path="/organizations/register"
				component={AddOrganizationScreen}
			/>
			<PrivateRoute
				exact
				path="/organizations/register/community/:id"
				component={AddOrganizationScreen}
			/>
			<PrivateRoute
				exact
				path="/organizations/register/project/:id"
				component={AddOrganizationScreen}
			/>
			<PrivateRoute
				exact
				path="/organizations/register/stakeholder/:id"
				component={AddOrganizationScreen}
			/>
			<PrivateRoute path="/organization/:id" component={Landing} />
		</Switch>
	);
};

export default OrganizationRoutes;
