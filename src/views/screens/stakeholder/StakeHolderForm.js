import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useStep } from 'react-hooks-helper';

//import stakeholder
import StakeholderContactInfo from './StakeHolderContactInfo';

//define steps
const steps = [{ id: 'Step1' }, { id: 'Step2' }, { id: 'Step3' }];

const StakeholderForm = ({ history, match }) => {
	const { url } = useRouteMatch();
	const { step, navigation } = useStep({ initialStep: 0, steps });
	const { id } = step;

	//define props to pass
	const props = { navigation, history, match, url };

	switch (id) {
		case 'Step1':
			return <StakeholderContactInfo {...props} />;
		default:
			return null;
	}
};

export default StakeholderForm;
