import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import CommitmentForm from '../../screens/commitment/CommitmentForm';

const CommitmentRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				path="/commitments/register/activity/:activityId"
				component={CommitmentForm}
			/>
		</Switch>
	);
};

export default CommitmentRoutes;
