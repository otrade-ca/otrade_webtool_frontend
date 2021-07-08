import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import UserStakeholders from '../../screens/stakeholder/UserStakeholders';
import AddForm from '../../screens/stakeholder/AddForm';
import StakeholderScreen from '../../screens/stakeholder/StakeholderScreen';

const StakeholderRoutes = () => {
	return (
		<Switch>
			<PrivateRoute exact path="/stakeholders/register" component={AddForm} />
			<PrivateRoute
				exact
				path="/stakeholders/register/community/:id"
				component={AddForm}
			/>
			<PrivateRoute
				exact
				path="/stakeholders/register/project/:id"
				component={AddForm}
			/>
			<PrivateRoute path="/stakeholders/:id" component={UserStakeholders} />
			<PrivateRoute path="/stakeholder/:id" component={StakeholderScreen} />
		</Switch>
	);
};

export default StakeholderRoutes;
