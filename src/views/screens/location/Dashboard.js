import React from 'react';
import ListOrganizations from '../organization/ListOrganizations';
import StakeholdersList from '../stakeholder/StakeholdersList';

const Dashboard = ({ match }) => {
	return (
		<div>
			<StakeholdersList match={match} />
			<ListOrganizations match={match} />
		</div>
	);
};

export default Dashboard;
