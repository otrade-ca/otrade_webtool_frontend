import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import ActivityAdd from '../../screens/activity/ActivityAdd';

const ActivityRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				exact
				path="/activities/register/project/:id"
				component={ActivityAdd}
			/>
			<PrivateRoute
				exact
				path="/activities/register/stakeholder/:id"
				component={ActivityAdd}
			/>
		</Switch>
	);
};

export default ActivityRoutes;
