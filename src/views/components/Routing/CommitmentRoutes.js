import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import { CommitmentAdd } from '../../screens/commitment';

const CommitmentRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				path="/commitments/register/activity/:activityId"
				component={CommitmentAdd}
			/>
		</Switch>
	);
};

export default CommitmentRoutes;
