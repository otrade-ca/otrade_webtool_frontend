import React from 'react';
import Activities from '../activity/Activities';
import StakeholderInfluences from '../influence/StakeholderInfluences';
import ViewForm from './ViewForm';

const Profile = ({ match }) => {
	return (
		<>
			<ViewForm match={match} />
			<Activities match={match} />
			<StakeholderInfluences match={match} />
		</>
	);
};

export default Profile;
