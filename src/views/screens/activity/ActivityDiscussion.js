import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveActivityInfo } from '../../../application/actions/activityActions';
import { addActivity } from '../../../application/actions/activityActions';
import { ProfileContainer } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const ActivityDiscussion = ({ navigation, match }) => {
	const { previous, next } = navigation;

	const { t } = useTranslation();

	// get activity from localStorage
	const dispatch = useDispatch();
	const activity = useSelector((state) => state.activitySave);
	const { activityInfo } = activity;

	//get project details
	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	// get activityAdd success
	// const activityAdd = useSelector(state => state.activityAdd);
	// const {success, activity: addedActivity } = activityAdd;

	//define states
	const [disPoints, setDispoints] = useState(activityInfo.discussPoints);
	const [compromise, setcompromise] = useState(activityInfo.compromise);

	// useEffect(() => {
	// 	if (success) {
	// 		console.log('success');
	// 		<Redirect to="`/stakeholder/${}/activities/:id/influences`" />;
	// 	}
	// }, [dispatch, success]);

	//handle submit form
	const submitHandler = (e) => {
		e.preventDefault();

		// add disPoints & compromise
		activityInfo.discussPoints = disPoints;
		activityInfo.compromise = compromise;

		// save to localStorage
		dispatch(saveActivityInfo(activityInfo));

		// save to database
		dispatch(addActivity(activityInfo, project._id));

		// navigate to next part of activity form
		next();
	};

	return (
		<ProfileContainer title={'Activity Registration'}>
			<Form onSubmit={submitHandler} className="mt-4 mb-3">
				<Form.Group controlId="discussion">
					<Form.Label>{t('activity.discussion.label')}</Form.Label>
					<Form.Group controlId="dispoints">
						<Form.Control
							as="textarea"
							rows="6"
							value={disPoints}
							onChange={(e) => setDispoints(e.target.value)}
						></Form.Control>
					</Form.Group>
				</Form.Group>
				<hr className="my-4" />
				<Form.Group controlId="compromise" className="mb-3">
					<Row>
						<Col md={10}>
							<Form.Label>{t('activity.commitment.label')}</Form.Label>
						</Col>
						<Col md={2}>
							<Form.Control
								as="select"
								value={compromise}
								onChange={(e) => setcompromise(e.target.value)}
							>
								<option value="">{t('action.select')}</option>
								<option value={t('activity.commitment.yes')}>
									{t('activity.commitment.yes')}
								</option>
								<option value={t('activity.commitment.no')}>
									{t('activity.commitment.no')}
								</option>
							</Form.Control>
						</Col>
					</Row>
				</Form.Group>
				<hr />
				<Row className="mt-3">
					<Col>
						<Button
							onClick={previous}
							variant="primary"
							className="px-5 mt-3 mr-3"
						>
							{t('action.previous')}
						</Button>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							{t('action.continue')}
						</Button>
					</Col>
				</Row>
			</Form>
		</ProfileContainer>
	);
};

export default ActivityDiscussion;
