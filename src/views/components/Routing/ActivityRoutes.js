import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import ActivityForm from '../../screens/activity/ActivityForm';

const ActivityRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				exact
				path="/activities/register/stakeholder/:id"
				component={ActivityForm}
			/>
		</Switch>
	);
};

export default ActivityRoutes;
