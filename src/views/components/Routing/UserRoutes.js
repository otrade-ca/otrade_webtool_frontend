import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import UserProfileScreen from '../../screens/user/UserProfileScreen';

const UserRoutes = () => {
	return (
		<Switch>
			<PrivateRoute path="/profile/:id" component={UserProfileScreen} />
		</Switch>
	);
};

export default UserRoutes;
