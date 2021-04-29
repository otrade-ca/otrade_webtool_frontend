import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../../../application/actions/activityActions';
import { ProfileContainer } from '../../components/HelperComponents';
import MemberDropdown from '../../components/MemberDropdown';
import { useTranslation } from 'react-i18next';

const ActivityType = ({ history }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	// get assigned members
	const stakeholderAssign = useSelector((state) => state.stakeholderAssign);
	const { members } = stakeholderAssign;

	// get project details
	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	// define states
	const [activityType, setActivityType] = useState();
	const [date, setDate] = useState();
	const [actHours, setActHours] = useState();
	const [location, setLocation] = useState();
	const [disPoints, setDispoints] = useState();
	const [compromise, setcompromise] = useState();

	//handle submit form
	const submitHandler = (e) => {
		e.preventDefault();

		//save activity
		dispatch(
			addActivity({
				activity: activityType,
				date,
				hours: actHours,
				location,
				stakeholders: members,
				discussPoints: disPoints,
				compromise,
				project: project._id,
			})
		);
	};

	return (
		<ProfileContainer title={'Activity Registration'}>
			<Form onSubmit={submitHandler} className="mb-3">
				<Row>
					<Col md={6}>
						<Form.Group controlId="activity">
							<Form.Label>{t('activity.activity.label')}</Form.Label>
							<Form.Control
								as="select"
								value={activityType}
								onChange={(e) => setActivityType(e.target.value)}
							>
								<option value={t('action.select')}>{t('action.select')}</option>
								<option value={t('activity.activity.informalConsultation')}>
									{t('activity.activity.informalConsultation')}
								</option>
								<option value={t('activity.activity.formalMeeting')}>
									{t('activity.activity.formalMeeting')}
								</option>
								<option value={t('activity.activity.informalCommunity')}>
									{t('activity.activity.informalCommunity')}
								</option>
								<option value={t('activity.activity.formalCommunity')}>
									{t('activity.activity.formalCommunity')}
								</option>
								<option value={t('activity.activity.geologySupport')}>
									{t('activity.activity.geologySupport')}
								</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md={2}>
						<Form.Group controlId="hours">
							<Form.Label>{t('activity.hours.label')}</Form.Label>
							<Form.Control
								type="number"
								placeholder={t('activity.hours.placeholder')}
								value={actHours}
								onChange={(e) => setActHours(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
					<Col md={4}>
						<Form.Group controlId="date">
							<Form.Label>{t('activity.date.label')}</Form.Label>
							<Form.Control
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="location">
							<Form.Label>{t('activity.location.label')}</Form.Label>
							<Form.Control
								type="text"
								placeholder={t('activity.location.placeholder')}
								value={location}
								onChange={(e) => setLocation(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<hr className="mt-3" />
				<MemberDropdown label={'Parties Involved'} />
				<hr className="mt-3" />
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
						<Button type="submit" variant="primary" className="px-5 mt-3">
							{t('action.continue')}
						</Button>
					</Col>
				</Row>
			</Form>
		</ProfileContainer>
	);
};

export default ActivityType;
