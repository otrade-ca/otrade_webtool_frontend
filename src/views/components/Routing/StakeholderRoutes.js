import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import {
	StakeholderAdd,
	Landing,
	UserStakeholders,
} from '../../screens/stakeholder';

const StakeholderRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				exact
				path="/stakeholders/register"
				component={StakeholderAdd}
			/>
			<PrivateRoute
				exact
				path="/stakeholders/register/community/:id"
				component={StakeholderAdd}
			/>
			<PrivateRoute
				exact
				path="/stakeholders/register/project/:id"
				component={StakeholderAdd}
			/>
			<PrivateRoute path="/stakeholders/:id" component={UserStakeholders} />
			<PrivateRoute path="/stakeholder/:id" component={Landing} />
		</Switch>
	);
};

export default StakeholderRoutes;
