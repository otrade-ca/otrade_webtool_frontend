import React from 'react';
import Activities from '../activity/Activities';
import StakeholderInfluences from '../influence/StakeholderInfluences';
import ViewStakeholderScreen from './ViewStakeholderScreen';

const Profile = ({ match }) => {
	return (
		<>
			<ViewStakeholderScreen match={match} />
			<Activities match={match} />
			<StakeholderInfluences match={match} />
		</>
	);
};

export default Profile;
