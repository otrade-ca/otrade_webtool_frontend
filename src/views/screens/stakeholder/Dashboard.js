import React from 'react';
import ListStakeholderActivities from '../activity/ListStakeholderActivities';
import StakeholderInfluences from '../influence/StakeholderInfluences';

const Dashboard = ({ match }) => {
	return (
		<div>
			<ListStakeholderActivities match={match} />

			<StakeholderInfluences match={match} />
		</div>
	);
};

export default Dashboard;
