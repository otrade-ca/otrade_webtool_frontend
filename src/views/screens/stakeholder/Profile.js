import React from 'react';
import Activities from '../activity/Activities';
import Influences from '../influence/Influences';
import StakeholderView from './StakeholderView';

const Profile = ({ match }) => {
	return (
		<>
			<StakeholderView match={match} />
			<Activities match={match} />
			<Influences match={match} />
		</>
	);
};

export default Profile;
