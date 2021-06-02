import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	getOrganizationDetails,
	updateOrganization,
} from '../../../application/actions/organizationAction';
import { ORGANIZATION_UPDATE_RESET } from '../../../application/constants/organizationConstants';
import { listLocationStakeholders } from '../../../application/actions/stakeholderActions';
import { getLocationId } from '../../../application/localStorage';
import { Loader, Message } from '../../components/HelperComponents';
import { setAlert } from '../../../application/actions/alertActions';
import { useTranslation } from 'react-i18next';

const OrganizationScreen = ({ match, history }) => {
	const projectId = match.params.projectId;
	const organizationId = match.params.organizationId;

	const { t } = useTranslation();

	// get locationId from localStorage
	const locationId = getLocationId();

	// get stakeholderList
	const dispatch = useDispatch();

	// get organization
	const organzationDetails = useSelector((state) => state.organizationDetails);
	const { loading, error, organization: orgDetails } = organzationDetails;

	const stakeholderProjectList = useSelector(
		(state) => state.stakeholderProjectList
	);
	const { stakeholders: members } = stakeholderProjectList;

	// get success on update
	const organizationUpdate = useSelector((state) => state.organizationUpdate);
	const { success } = organizationUpdate;

	// define states
	const [organization, setOrganization] = useState('');
	const [division, setDivision] = useState('');
	const [location, setLocation] = useState('');
	const [email, setEmail] = useState('');
	const [telephone, setTelephone] = useState('');
	const [website, setWebsite] = useState('');
	const [stakeholders, setStakeholders] = useState([{ member: '' }]);

	useEffect(() => {
		if (success) {
			dispatch(getOrganizationDetails(organizationId));
			dispatch({ type: ORGANIZATION_UPDATE_RESET });
		} else {
			if (!orgDetails.name || orgDetails._id !== organizationId) {
				dispatch(getOrganizationDetails(organizationId));
				dispatch(listLocationStakeholders(locationId));
			} else {
				setOrganization(orgDetails.name);
				setDivision(orgDetails.division);
				setLocation(orgDetails.address);
				setEmail(orgDetails.email);
				setTelephone(orgDetails.telephone);
				setWebsite(orgDetails.website);
				setStakeholders(orgDetails.stakeholders);
			}
		}
	}, [dispatch, orgDetails, organizationId, success, locationId]);

	//add select field
	const addHandler = () => {
		setStakeholders([...stakeholders, { stakeholder: '' }]);
	};

	//filter out element i
	const removeHandler = (i) => {
		const stakeholderToRemove = stakeholders[i];
		const list = stakeholders.filter((i) => i !== stakeholderToRemove);
		setStakeholders(list);
	};

	//add element to array && provide validation
	const handleInputChange = (e, i) => {
		e.preventDefault();
		const list = [...stakeholders];

		if (
			list.includes(e.target.value) ||
			list.some((item) => item._id === e.target.value)
		) {
			setAlert(
				'Please make sure the same user is not assigned twice.',
				'danger'
			);
		} else {
			list[i] = e.target.value;
			setStakeholders(list);
		}
	};

	//submit form
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			updateOrganization(
				{
					name: organization,
					division,
					address: location,
					email,
					telephone,
					website,
					stakeholders,
					project: projectId,
				},
				organizationId,
				history
			)
		);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Card className="my-card">
					<Card.Header className="my-card-header">
						<h4>{t('tables.organization')}</h4>
					</Card.Header>
					<Card.Body>
						<Form onSubmit={submitHandler}>
							<Row>
								<Col md={6}>
									<Form.Group controlId="organization">
										<Form.Label>
											{t('organization.organization_name.label')}
										</Form.Label>
										<Form.Control
											type="organization"
											placeholder={t(
												'organization.organization_name.placeholder'
											)}
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
								<Col md={4}>
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
								<Col md={6}>
									<Form.Group controlId="website">
										<Form.Label>
											{t('organization.social_Media.label')}
										</Form.Label>
										<Form.Control
											type="website"
											placeholder={t('organization.social_Media.placeholder')}
											value={website}
											onChange={(e) => setWebsite(e.target.value)}
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<hr />
							<Row className="mt-3 pl-3">
								<Form.Label>
									{t('organization.organization_Members.label')}
								</Form.Label>
							</Row>
							<Row>
								<Col md={9}>
									{stakeholders &&
										stakeholders.map((assignee, i) => (
											<Row key={assignee._id}>
												<Col md={8}>
													<Form.Control
														as="select"
														value={assignee}
														onChange={(e) => handleInputChange(e, i)}
														className="px-5 mb-3"
													>
														<option value="">{t('action.select')}</option>
														{members &&
															members.map((stakeholder) => (
																<option
																	key={stakeholder._id}
																	value={stakeholder._id}
																>
																	{stakeholder.firstName} {stakeholder.lastName}
																</option>
															))}
													</Form.Control>
												</Col>
												<Col md={4}>
													{stakeholders.length !== 1 && (
														<Button
															variant="danger"
															className="btn-md mr-3"
															onClick={() => removeHandler(i)}
														>
															<i className="fas fa-trash"></i> Remove
														</Button>
													)}
													{stakeholders.length - 1 === i && (
														<Button
															className="px-3"
															onClick={() => addHandler(i)}
														>
															<i className="fas fa-plus"></i> Add
														</Button>
													)}
												</Col>
											</Row>
										))}
								</Col>
							</Row>
							<hr />
							<Row className="mt-3">
								<Col>
									<Button type="submit" variant="primary" className="px-5 mt-3">
										{t('action.update')}
									</Button>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default OrganizationScreen;
