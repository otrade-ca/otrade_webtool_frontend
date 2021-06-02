import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addOrganization } from '../../../application/actions/organizationAction';
import MemberDropdownProject from '../../components/MemberDropdownProject';
import { useTranslation } from 'react-i18next';
import { getLocationId } from '../../../application/localStorage';

const AddOrganizationScreen = ({ match, history }) => {
	// id is either match or from localStorage
	const id = match.params.id ? match.params.id : getLocationId();

	const { t } = useTranslation();
	const dispatch = useDispatch();

	//get project details
	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	//get location details
	const locationDetails = useSelector((state) => state.locationDetails);
	const { location: loc } = locationDetails;

	const stakeholderAssign = useSelector((state) => state.stakeholderAssign);
	const { members } = stakeholderAssign;

	const routeSave = useSelector((state) => state.routeSave);
	const { routeInfo } = routeSave;

	//define states
	const [organization, setOrganization] = useState('');
	const [division, setDivision] = useState('');
	const [location, setLocation] = useState('');
	const [email, setEmail] = useState('');
	const [telephone, setTelephone] = useState('');
	const [website, setWebsite] = useState('');

	//submit form
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			addOrganization(
				{
					name: organization,
					division,
					address: location,
					email,
					telephone,
					website,
					location: id || loc._id,
					project: project._id,
					stakeholders: members,
				},
				routeInfo,
				history
			)
		);
	};

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">
				<h4>{t('tables.organization')}</h4>
			</Card.Header>
			<Card.Body>
				<Form onSubmit={submitHandler} className="mb-3">
					<Row>
						<Col md={6}>
							<Form.Group controlId="organization">
								<Form.Label>
									{t('organization.organization_name.label')}
								</Form.Label>
								<Form.Control
									type="organization"
									placeholder={t('organization.organization_name.placeholder')}
									value={organization}
									required
									onChange={(e) => setOrganization(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="division">
								<Form.Label>
									{t('organization.political_Division.label')}
								</Form.Label>
								<Form.Control
									as="select"
									value={division}
									required
									onChange={(e) => setDivision(e.target.value)}
								>
									<option value="">--Select--</option>
									<option value={t('division.community')}>
										{t('division.community')}
									</option>
									<option value={t('division.federation')}>
										{t('division.federation')}
									</option>
									<option value={t('division.municipality')}>
										{t('division.municipality')}
									</option>
									<option value={t('division.parish')}>
										{t('division.parish')}
									</option>
									<option value={t('division.settlement')}>
										{t('division.settlement')}
									</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<Form.Group controlId="location">
								<Form.Label>{t('organization.address.label')}</Form.Label>
								<Form.Control
									type="location"
									placeholder={t('organization.address.placeholder')}
									value={location}
									onChange={(e) => setLocation(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<Form.Group controlId="email">
								<Form.Label>{t('organization.email.label')}</Form.Label>
								<Form.Control
									type="email"
									placeholder={t('organization.email.placeholder')}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="telephone">
								<Form.Label>{t('organization.telephone.label')}</Form.Label>
								<Form.Control
									type="telephone"
									placeholder={t('organization.telephone.placeholder')}
									value={telephone}
									onChange={(e) => setTelephone(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={6} className="mt-3">
							<Form.Group controlId="website">
								<Form.Label>{t('organization.social_Media.label')}</Form.Label>
								<Form.Control
									type="website"
									placeholder={t('organization.social_Media.placeholder')}
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<hr className="mt-3" />
					<MemberDropdownProject label={'Organization Members'} />
					<hr />
					<Row className="mt-3">
						<Col>
							<Button type="submit" variant="primary" className="px-5 mt-3">
								{t('action.register')}
							</Button>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default withRouter(AddOrganizationScreen);
