import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useStep } from 'react-hooks-helper';

// import landownership
import Ownership from './Ownership';
import PaperworkMeasurements from './PaperworkMeasurements';
import EconomicActivity from './EconomicActivity';

// define steps
const steps = [{ id: 'Step1' }, { id: 'Step2' }, { id: 'Step3' }];

const StepForm = ({ history, match }) => {
	const { url } = useRouteMatch();
	const { step, navigation } = useStep({ initialStep: 0, steps });
	const { id } = step;

	const props = { navigation, history, match, url };

	switch (id) {
		case 'Step1':
			return <Ownership {...props} />;
		case 'Step2':
			return <PaperworkMeasurements {...props} />;
		case 'Step3':
			return <EconomicActivity {...props} />;
		default:
			return null;
	}
};

export default StepForm;
