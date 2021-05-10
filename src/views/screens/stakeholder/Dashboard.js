import React from 'react';
import ListStakeholderActivities from '../activity/ListStakeholderActivities';
import StakeholderInfluences from '../influence/StakeholderInfluences';

const Dashboard = ({ match }) => {
	return (
		<div>
			<StakeholderInfluences match={match} />
			<ListStakeholderActivities match={match} />
		</div>
	);
};

export default Dashboard;
