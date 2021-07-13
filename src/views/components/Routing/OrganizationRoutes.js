import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import OrganizationAdd from '../../screens/organization/OrganizationAdd';
import Landing from '../../screens/organization/Landing';

const OrganizationRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				exact
				path="/organizations/register"
				component={OrganizationAdd}
			/>
			<PrivateRoute
				exact
				path="/organizations/register/community/:id"
				component={OrganizationAdd}
			/>
			<PrivateRoute
				exact
				path="/organizations/register/project/:id"
				component={OrganizationAdd}
			/>
			<PrivateRoute
				exact
				path="/organizations/register/stakeholder/:id"
				component={OrganizationAdd}
			/>
			<PrivateRoute path="/organization/:id" component={Landing} />
		</Switch>
	);
};

export default OrganizationRoutes;
