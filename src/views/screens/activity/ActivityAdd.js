import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../../../application/actions/activityActions';
import MemberDropdownProject from '../../components/Dropdown/MemberDropdownProject';
import { useTranslation } from 'react-i18next';
import { CardContainer } from '../../components/HelperComponents';
// import SingleCommunityDropdown from '../../components/Dropdown/SingleCommunityDropdown';
// import { getProjectId } from '../../../application/localStorage';

const ActivityAdd = ({ history }) => {
	const { t } = useTranslation();
	//const projectId = getProjectId();
	const dispatch = useDispatch();

	// get assigned members
	const stakeholderAssign = useSelector((state) => state.stakeholderAssign);
	const { members } = stakeholderAssign;

	// TODO: figure out how to incorporate location/community
	// const locationAssign = useSelector((state) => state.locationAssign);
	// const { location } = locationAssign;

	const routeSave = useSelector((state) => state.routeSave);
	const { routeInfo } = routeSave;

	// define states
	const [activityType, setActivityType] = useState();
	const [date, setDate] = useState();
	const [actHours, setActHours] = useState();
	const [address, setAddress] = useState();
	const [disPoints, setDispoints] = useState();
	const [compromise, setcompromise] = useState();

	// handle submit form
	const submitHandler = (e) => {
		e.preventDefault();

		//save activity
		dispatch(
			addActivity(
				{
					activity: activityType,
					date,
					hours: actHours,
					address,
					stakeholders: members,
					discussPoints: disPoints,
					compromise,
					// location,
				},
				routeInfo,
				history
			)
		);
	};

	return (
		<CardContainer title={'Activity Information'}>
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
								<option value="informal consultation">
									{t('activity.activity.informalConsultation')}
								</option>
								<option value="formal meeting">
									{t('activity.activity.formalMeeting')}
								</option>
								<option value="informal community assembly">
									{t('activity.activity.informalCommunity')}
								</option>
								<option value="formal community assembly">
									{t('activity.activity.formalCommunity')}
								</option>
								<option value="geology support">
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
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<hr />
				<Row>
					{/* <Col md={6}>
						<SingleCommunityDropdown label={'Community'} id={projectId} />
					</Col> */}
					<Col md={6}>
						<MemberDropdownProject label={'Stakeholders'} />
					</Col>
				</Row>
				<hr />
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
				<hr />
				<Form.Group controlId="compromise" className="mb-3">
					<Row>
						<Col md={10}>
							<Form.Label>{t('activity.commitment.label')}</Form.Label>
						</Col>
						<Col md={2}>
							<Form.Control
								as="select"
								value={compromise}
								required
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
				<Row>
					<Col>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							{t('action.continue')}
						</Button>
					</Col>
				</Row>
			</Form>
		</CardContainer>
	);
};

export default ActivityAdd;