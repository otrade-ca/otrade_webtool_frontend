import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useStep } from 'react-hooks-helper';

//import activity
import ActivityType from './ActivityType';
import ActivityDiscussion from './ActivityDiscussion';
import CommitmentDetails from '../commitment/CommitmentDetails';
import Influences from '../influence/Influences';

const steps = [{ id: 'Step1' }, { id: 'Step2' }, { id: 'Step3' }];

const ActivityForm = ({ history, match }) => {
	const { url } = useRouteMatch();
	const { step, navigation } = useStep({ initialStep: 0, steps });
	const { id } = step;

	//define props to pass
	const props = { navigation, history, match, url };

	switch (id) {
		case 'Step1':
			return <ActivityType {...props} />;
		case 'Step2':
			return <ActivityDiscussion {...props} />;
		case 'Step3':
			return <Influences {...props} />;
		case 'Step4':
			return <CommitmentDetails {...props} />;
		default:
			return null;
	}
};

export default ActivityForm;
