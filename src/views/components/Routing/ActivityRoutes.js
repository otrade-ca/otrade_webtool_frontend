import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import ActivityForm from '../../screens/activity/ActivityForm';

const ActivityRoutes = () => {
	return (
		<Switch>
			<PrivateRoute path="/activities/register" component={ActivityForm} />
		</Switch>
	);
};

export default ActivityRoutes;
