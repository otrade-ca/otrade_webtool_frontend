import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import ActivityType from '../../screens/activity/ActivityType';

const ActivityRoutes = () => {
	return (
		<Switch>
			<PrivateRoute path="/activities/register" component={ActivityType} />
		</Switch>
	);
};

export default ActivityRoutes;
