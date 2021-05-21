import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import StakeholderScreen from '../../screens/stakeholder/StakeholderScreen';
import StakeholdersUserList from '../../screens/stakeholder/StakeholdersUserList';
import StakeHolderContactInfo from '../../screens/stakeholder/StakeHolderContactInfo';

const StakeholderRoutes = () => {
	return (
		<Switch>
			<PrivateRoute
				path="/stakeholders/register/community/:id"
				component={StakeHolderContactInfo}
			/>
			<PrivateRoute path="/stakeholders/:id" component={StakeholdersUserList} />
			<PrivateRoute path="/stakeholder/:id" component={StakeholderScreen} />
		</Switch>
	);
};

export default StakeholderRoutes;
