import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import { InfluenceAdd } from '../../screens/influence';

const InfluenceRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				path="/influences/register/stakeholder/:stakeholderId"
				component={InfluenceAdd}
			/>
		</Switch>
	);
};

export default InfluenceRoutes;
