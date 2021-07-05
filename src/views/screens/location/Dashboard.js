import React from 'react';
import ListOrganizations from '../organization/ListOrganizations';
import LocationStakeholders from '../stakeholder/LocationStakeholders';

const Dashboard = ({ match }) => {
	return (
		<div>
			<LocationStakeholders match={match} />
			<ListOrganizations match={match} />
		</div>
	);
};

export default Dashboard;
