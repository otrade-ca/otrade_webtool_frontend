import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import InfluenceForm from '../../screens/influence/InfluenceForm';

const InfluenceRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				path="/influences/register/stakeholder/:stakeholderId"
				component={InfluenceForm}
			/>
		</Switch>
	);
};

export default InfluenceRoutes;
