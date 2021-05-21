import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import StakeholderScreen from '../../screens/stakeholder/StakeholderScreen';
import StakeholdersUserList from '../../screens/stakeholder/StakeholdersUserList';

const StakeholderRoutes = () => {
	return (
		<Switch>
			<PrivateRoute path="/stakeholders/:id" component={StakeholdersUserList} />
			<PrivateRoute path="/stakeholder/:id" component={StakeholderScreen} />
		</Switch>
	);
};

export default StakeholderRoutes;
